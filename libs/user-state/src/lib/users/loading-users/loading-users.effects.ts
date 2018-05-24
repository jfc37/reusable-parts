import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
    .ofType(LoadingUsersActionTypes.GetAll)
    .pipe(
      withLatestFrom(
        this.store.select(hasLoadingAllUsersErroredSelector),
        (action, shouldReset) => shouldReset && new ResetAllUsers(),
      ),
      filter(Boolean),
    );

  @Effect()
  getAllLoad$ = this.actions$
    .ofType(LoadingUsersActionTypes.GetAll)
    .pipe(
      withLatestFrom(
        this.store.select(shouldLoadAllUsersSelectors),
        (action, shouldLoad) => shouldLoad && new LoadAllUsers(),
      ),
      filter(Boolean),
    );

  @Effect()
  loadAll$ = this.actions$
    .ofType(LoadingUsersActionTypes.LoadAll)
    .pipe(
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
    .ofType<LoadUser>(LoadingUsersActionTypes.Get)
    .pipe(
      withLatestFrom(
        this.store.select(allUserIdsLoadingOrLoaded),
        (action, loadingOrLoadedIds) =>
          !(loadingOrLoadedIds.includes(action.id) || loadingOrLoadedIds.includes('all')) && new LoadUser(action.id),
      ),
      filter(Boolean),
    );

  @Effect()
  load$ = this.actions$
    .ofType<LoadUser>(LoadingUsersActionTypes.Load)
    .pipe(
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
