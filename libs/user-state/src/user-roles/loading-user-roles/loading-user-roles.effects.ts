import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  hasLoadingAllUserRolesErroredSelector,
  shouldLoadAllUserRolesSelectors,
} from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.selectors';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import {
  LoadAllUserRoles,
  LoadAllUserRolesFailure,
  LoadAllUserRolesSuccess,
  LoadingUserRolesActionTypes,
  ResetAllUserRoles,
} from './loading-user-roles.actions';
import { SetUserRoles } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.actions';

@Injectable()
export class LoadingUserRolesEffects {
  @Effect()
  getAll$ = this.actions$
    .ofType(LoadingUserRolesActionTypes.GetAll)
    .pipe(
      withLatestFrom(this.store.select(hasLoadingAllUserRolesErroredSelector)),
      map(([action, shouldReset]) => shouldReset && new ResetAllUserRoles()),
      withLatestFrom(this.store.select(shouldLoadAllUserRolesSelectors)),
      map(([resetAction, shouldLoad]) =>
        [resetAction, shouldLoad && new LoadAllUserRoles()].filter(Boolean)
      ),
      filter(actions => actions.length > 0),
      mergeMap(actions => actions)
    );

  @Effect()
  loadAll$ = this.actions$
    .ofType(LoadingUserRolesActionTypes.LoadAll)
    .pipe(
      switchMap(() =>
        this.repository
          .getAllUserRoles()
          .pipe(
            mergeMap(roles => [
              new SetUserRoles(...roles),
              new LoadAllUserRolesSuccess(),
            ]),
            catchError(err =>
              of(
                new LoadAllUserRolesFailure(err || 'Failed loading user roles')
              )
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
