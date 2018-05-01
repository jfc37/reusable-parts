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
  tap,
  exhaustMap,
} from 'rxjs/operators';
import { SetUserRoles } from '../user-roles/user-roles.actions';
import {
  LoadAllUserRoles,
  LoadAllUserRolesFailure,
  LoadAllUserRolesSuccess,
  LoadingUserRolesActionTypes,
  ResetAllUserRoles,
  GetUserRolesByRole,
  LoadUserRolesByRole,
  LoadUserRolesByRoleSuccess,
  LoadUserRolesByRoleFailure,
} from './loading-user-roles.actions';
import {
  hasLoadingAllUserRolesErroredSelector,
  shouldLoadAllUserRolesSelectors,
  allUserRoleIdsErrored,
  allUserRoleIdsLoadingOrLoaded,
} from './loading-user-roles.selectors';

@Injectable()
export class LoadingUserRolesEffects {
  @Effect()
  getAll$ = this.actions$
    .ofType(LoadingUserRolesActionTypes.GetAll)
    .pipe(
      withLatestFrom(
        this.store.select(hasLoadingAllUserRolesErroredSelector),
        (action, shouldReset) => shouldReset && new ResetAllUserRoles()
      ),
      withLatestFrom(
        this.store.select(shouldLoadAllUserRolesSelectors),
        (resetAction, shouldLoad) => [
          resetAction,
          shouldLoad && new LoadAllUserRoles(),
        ]
      ),
      map(actions => actions.filter(Boolean)),
      filter(actions => actions.length > 0),
      mergeMap(actions => actions)
    );

  @Effect()
  loadAll$ = this.actions$
    .ofType(LoadingUserRolesActionTypes.LoadAll)
    .pipe(
      exhaustMap(() =>
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

  @Effect()
  getByRoleReset$ = this.actions$
    .ofType<GetUserRolesByRole>(LoadingUserRolesActionTypes.GetByRole)
    .pipe(
      withLatestFrom(
        this.store.select(allUserRoleIdsErrored),
        (action, erroredIds) =>
          erroredIds[action.role] && new ResetAllUserRoles()
      ),
      filter(Boolean)
    );

  @Effect()
  getByRoleLoad$ = this.actions$
    .ofType<GetUserRolesByRole>(LoadingUserRolesActionTypes.GetByRole)
    .pipe(
      withLatestFrom(
        this.store.select(allUserRoleIdsLoadingOrLoaded),
        (action, loadingOrLoadedIds) =>
          !(
            loadingOrLoadedIds.includes(action.role) ||
            loadingOrLoadedIds.includes('all')
          ) && new LoadUserRolesByRole(action.role)
      ),
      filter(Boolean)
    );

  @Effect()
  loadByRole$ = this.actions$
    .ofType<LoadUserRolesByRole>(LoadingUserRolesActionTypes.LoadByRole)
    .pipe(
      mergeMap(action =>
        this.repository
          .getUserRolesByRole(action.role)
          .pipe(
            mergeMap(roles => [
              new SetUserRoles(...roles),
              new LoadUserRolesByRoleSuccess(action.role),
            ]),
            catchError(err =>
              of(
                new LoadUserRolesByRoleFailure(
                  action.role,
                  err || 'Failed loading user roles'
                )
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
