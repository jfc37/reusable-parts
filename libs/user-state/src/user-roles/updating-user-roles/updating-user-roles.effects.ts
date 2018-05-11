import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/user-feature.reducer';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom, tap, exhaustMap } from 'rxjs/operators';
import {
  UpdatingUserRolesActionTypes,
  AttemptToUpdateUserRoles,
  UpdateUserRolesRequest,
  UpdateUserRolesSuccess,
  UpdateUserRolesFailure,
} from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.actions';
import { allUserRoleIdsUpdating } from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.selectors';
import { AddUserRole } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.actions';

@Injectable()
export class UpdatingUserRolesEffects {
  @Effect()
  attempt$ = this.actions$
    .ofType<AttemptToUpdateUserRoles>(UpdatingUserRolesActionTypes.UpdateAttempt)
    .pipe(
      withLatestFrom(this.store.select(allUserRoleIdsUpdating)),
      filter(([action, updatingIds]) => !updatingIds.includes(action.id)),
      map(([action]) => new UpdateUserRolesRequest(action.id, action.role)),
    );

  @Effect()
  update$ = this.actions$
    .ofType<UpdateUserRolesRequest>(UpdatingUserRolesActionTypes.UpdateRequest)
    .pipe(
      exhaustMap(action =>
        this.repository
          .addUserRole(action.id, action.role)
          .pipe(
            mergeMap(roles => [new AddUserRole(action.id, action.role), new UpdateUserRolesSuccess(action.id)]),
            catchError(err => of(new UpdateUserRolesFailure(action.id, err || 'Failed updating user roles'))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>,
    private repository: FirebaseUsersService,
  ) {}
}
