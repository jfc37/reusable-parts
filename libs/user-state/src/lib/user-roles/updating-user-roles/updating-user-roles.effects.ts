import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/lib/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/lib/user-feature.reducer';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom, tap, exhaustMap } from 'rxjs/operators';
import {
  UpdatingUserRolesActionTypes,
  AttemptToUpdateUserRoles,
  UpdateUserRolesRequest,
  UpdateUserRolesSuccess,
  UpdateUserRolesFailure,
} from '@reusable-parts/user-state/src/lib/user-roles/updating-user-roles/updating-user-roles.actions';
import { allUserRoleIdsUpdating } from '@reusable-parts/user-state/src/lib/user-roles/updating-user-roles/updating-user-roles.selectors';
import { AddUserRole } from '@reusable-parts/user-state/src/lib/user-roles/user-roles/user-roles.actions';

@Injectable()
export class UpdatingUserRolesEffects {
  @Effect()
  attempt$ = this.actions$
    .pipe(
      ofType<AttemptToUpdateUserRoles>(UpdatingUserRolesActionTypes.UpdateAttempt),
      withLatestFrom(this.store.pipe(select(allUserRoleIdsUpdating))),
      filter(([action, updatingIds]) => !updatingIds.includes(action.id)),
      map(([action]) => new UpdateUserRolesRequest(action.id, action.role)),
    );

  @Effect()
  update$ = this.actions$
    .pipe(
      ofType<UpdateUserRolesRequest>(UpdatingUserRolesActionTypes.UpdateRequest),
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
