import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/lib/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/lib/user-feature.reducer';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { SetUsers } from '../users/users.actions';
import {
  LoadAllUsers,
  LoadAllUsersFailure,
  LoadAllUsersSuccess,
  LoadingUsersActionTypes,
  ResetAllUsers,
  LoadUser,
  LoadUserFailure,
  LoadUserSuccess,
} from './loading-users.actions';
import {
  hasLoadingAllUsersErroredSelector,
  shouldLoadAllUsersSelectors,
  allUserIdsLoadingOrLoaded,
} from './loading-users.selectors';

@Injectable()
export class LoadingUsersEffects {
  @Effect()
  getAllReset$ = this.actions$
    .pipe(
      ofType(LoadingUsersActionTypes.GetAll),
      withLatestFrom(
        this.store.pipe(select(hasLoadingAllUsersErroredSelector)),
        (action, shouldReset) => shouldReset && new ResetAllUsers(),
      ),
      filter(Boolean),
    );

  @Effect()
  getAllLoad$ = this.actions$
    .pipe(
      ofType(LoadingUsersActionTypes.GetAll),
      withLatestFrom(
        this.store.pipe(select(shouldLoadAllUsersSelectors)),
        (action, shouldLoad) => shouldLoad && new LoadAllUsers(),
      ),
      filter(Boolean),
    );

  @Effect()
  loadAll$ = this.actions$
    .pipe(
      ofType(LoadingUsersActionTypes.LoadAll),
      mergeMap(() =>
        this.repository
          .getAllUsers()
          .pipe(
            mergeMap(users => [new SetUsers(...users), new LoadAllUsersSuccess()]),
            catchError(err => of(new LoadAllUsersFailure(err || 'Failed loading users'))),
          ),
      ),
    );

  @Effect()
  getLoad$ = this.actions$
    .pipe(
      ofType<LoadUser>(LoadingUsersActionTypes.Get),
      withLatestFrom(
        this.store.pipe(select(allUserIdsLoadingOrLoaded)),
        (action, loadingOrLoadedIds) =>
          !(loadingOrLoadedIds.includes(action.id) || loadingOrLoadedIds.includes('all')) && new LoadUser(action.id),
      ),
      filter(Boolean),
    );

  @Effect()
  load$ = this.actions$
    .pipe(
      ofType<LoadUser>(LoadingUsersActionTypes.Load),
      mergeMap(action =>
        this.repository
          .getUser(action.id)
          .pipe(
            mergeMap(user => [new SetUsers(user), new LoadUserSuccess(action.id)]),
            catchError(err => of(new LoadUserFailure(action.id, err || 'Failed loading user'))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>,
    private repository: FirebaseUsersService,
  ) {}
}
