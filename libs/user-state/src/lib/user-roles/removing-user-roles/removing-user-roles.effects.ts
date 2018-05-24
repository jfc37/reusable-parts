import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/lib/services/firebase-users.service';
import { UserFeatureState } from '@reusable-parts/user-state/src/lib/user-feature.reducer';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import {
  RemovingUserRolesActionTypes,
  AttemptToRemoveUserRoles,
  RemoveUserRolesRequest,
  RemoveUserRolesSuccess,
  RemoveUserRolesFailure,
} from '@reusable-parts/user-state/src/lib/user-roles/removing-user-roles/removing-user-roles.actions';
import { allUserRoleIdsRemoving } from '@reusable-parts/user-state/src/lib/user-roles/removing-user-roles/removing-user-roles.selectors';
import {
  AddUserRole,
  RemoveUserRole,
} from '@reusable-parts/user-state/src/lib/user-roles/user-roles/user-roles.actions';

@Injectable()
export class RemovingUserRolesEffects {
  @Effect()
  attempt$ = this.actions$
    .ofType<AttemptToRemoveUserRoles>(RemovingUserRolesActionTypes.RemoveAttempt)
    .pipe(
      withLatestFrom(this.store.select(allUserRoleIdsRemoving)),
      filter(([action, removingIds]) => !removingIds.includes(action.id)),
      map(([action]) => new RemoveUserRolesRequest(action.id, action.role)),
    );

  @Effect()
  remove$ = this.actions$
    .ofType<RemoveUserRolesRequest>(RemovingUserRolesActionTypes.RemoveRequest)
    .pipe(
      mergeMap(action =>
        this.repository
          .removeUserRole(action.id, action.role)
          .pipe(
            mergeMap(roles => [new RemoveUserRole(action.id, action.role), new RemoveUserRolesSuccess(action.id)]),
            catchError(err => of(new RemoveUserRolesFailure(action.id, err || 'Failed removing user roles'))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>,
    private repository: FirebaseUsersService,
  ) {}
}
