import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/user-feature.reducer';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { SetUsers } from '../users/users.actions';
import {
  LoadAllUsers,
  LoadAllUsersFailure,
  LoadAllUsersSuccess,
  LoadingUsersActionTypes,
  ResetAllUsers,
} from './loading-users.actions';
import {
  hasLoadingAllUsersErroredSelector,
  shouldLoadAllUsersSelectors,
} from './loading-users.selectors';

@Injectable()
export class LoadingUsersEffects {
  @Effect()
  getAll$ = this.actions$
    .ofType(LoadingUsersActionTypes.GetAll)
    .pipe(
      withLatestFrom(this.store.select(hasLoadingAllUsersErroredSelector)),
      map(([action, shouldReset]) => shouldReset && new ResetAllUsers()),
      withLatestFrom(this.store.select(shouldLoadAllUsersSelectors)),
      map(([resetAction, shouldLoad]) =>
        [resetAction, shouldLoad && new LoadAllUsers()].filter(Boolean)
      ),
      filter(actions => actions.length > 0),
      mergeMap(actions => actions)
    );

  @Effect()
  loadAll$ = this.actions$
    .ofType(LoadingUsersActionTypes.LoadAll)
    .pipe(
      switchMap(() =>
        this.repository
          .getAllUsers()
          .pipe(
            mergeMap(roles => [
              new SetUsers(...roles),
              new LoadAllUsersSuccess(),
            ]),
            catchError(err =>
              of(new LoadAllUsersFailure(err || 'Failed loading users'))
            )
          )
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>,
    private repository: FirebaseUsersService
  ) {}
}
