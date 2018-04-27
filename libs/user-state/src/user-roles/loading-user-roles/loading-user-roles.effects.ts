import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  LoadingUserRolesActionTypes,
  LoadAllUserRoles,
  LoadAllUserRolesSuccess,
  LoadAllUserRolesFailure,
} from './loading-user-roles.actions';
import {
  map,
  filter,
  mapTo,
  withLatestFrom,
  switchMap,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserFeatureState } from '@reusable-parts/user-state/src/user-feature.reducer';
import { shouldLoadAllUserRolesSelectors } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.selectors';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/services/firebase-users.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoadingUserRolesEffects {
  @Effect()
  getAll$ = this.actions$
    .ofType(LoadingUserRolesActionTypes.GetAll)
    .pipe(
      withLatestFrom(this.store.select(shouldLoadAllUserRolesSelectors)),
      filter(([action, shouldLoad]) => shouldLoad),
      mapTo(new LoadAllUserRoles())
    );

  @Effect()
  loadAll$ = this.actions$.ofType(LoadingUserRolesActionTypes.LoadAll).pipe(
    switchMap(() =>
      this.repository
        .getAllUserRoles()
        .pipe(mergeMap(meals => [new LoadAllUserRolesSuccess()]))
    ),
    catchError(err => {
      console.error('Error loading all user roles');
      return of(
        new LoadAllUserRolesFailure(err || 'Failed loading user roles')
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>,
    private repository: FirebaseUsersService
  ) {}
}
