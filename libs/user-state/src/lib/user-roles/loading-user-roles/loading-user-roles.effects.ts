import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/lib/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/lib/user-feature.reducer';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom, tap, exhaustMap } from 'rxjs/operators';
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
import { isArrayNotEmpty } from '@reusable-parts/common-functions/src';

@Injectable()
export class LoadingUserRolesEffects {
  @Effect()
  getAll$ = this.actions$
    .pipe(
      ofType(LoadingUserRolesActionTypes.GetAll),
      withLatestFrom(
        this.store.pipe(select(hasLoadingAllUserRolesErroredSelector)),
        (action, shouldReset) => shouldReset && new ResetAllUserRoles(),
      ),
      withLatestFrom(this.store.pipe(select(shouldLoadAllUserRolesSelectors)), (resetAction, shouldLoad) => [
        resetAction,
        shouldLoad && new LoadAllUserRoles(),
      ]),
      map(actions => actions.filter(Boolean)),
      filter(isArrayNotEmpty),
      mergeMap(actions => actions),
    );

  @Effect()
  loadAll$ = this.actions$
    .pipe(
      ofType(LoadingUserRolesActionTypes.LoadAll),
      exhaustMap(() =>
        this.repository
          .getAllUserRoles()
          .pipe(
            mergeMap(roles => [new SetUserRoles(...roles), new LoadAllUserRolesSuccess()]),
            catchError(err => of(new LoadAllUserRolesFailure(err || 'Failed loading user roles'))),
          ),
      ),
    );

  @Effect()
  getByRoleReset$ = this.actions$
    .pipe(
      ofType<GetUserRolesByRole>(LoadingUserRolesActionTypes.GetByRole),
      withLatestFrom(
        this.store.pipe(select(allUserRoleIdsErrored)),
        (action, erroredIds) => erroredIds[action.role] && new ResetAllUserRoles(),
      ),
      filter(Boolean),
    );

  @Effect()
  getByRoleLoad$ = this.actions$
    .pipe(
      ofType<GetUserRolesByRole>(LoadingUserRolesActionTypes.GetByRole),
      withLatestFrom(
        this.store.pipe(select(allUserRoleIdsLoadingOrLoaded)),
        (action, loadingOrLoadedIds) =>
          !(loadingOrLoadedIds.includes(action.role) || loadingOrLoadedIds.includes('all')) &&
          new LoadUserRolesByRole(action.role),
      ),
      filter(Boolean),
    );

  @Effect()
  loadByRole$ = this.actions$
    .pipe(
      ofType<LoadUserRolesByRole>(LoadingUserRolesActionTypes.LoadByRole),
      mergeMap(action =>
        this.repository
          .getUserRolesByRole(action.role)
          .pipe(
            mergeMap(roles => [new SetUserRoles(...roles), new LoadUserRolesByRoleSuccess(action.role)]),
            catchError(err => of(new LoadUserRolesByRoleFailure(action.role, err || 'Failed loading user roles'))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>,
    private repository: FirebaseUsersService,
  ) {}
}
