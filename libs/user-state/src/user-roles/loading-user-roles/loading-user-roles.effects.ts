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
} from 'rxjs/operators';
import { SetUserRoles } from '../user-roles/user-roles.actions';
import {
  LoadAllUserRoles,
  LoadAllUserRolesFailure,
  LoadAllUserRolesSuccess,
  LoadingUserRolesActionTypes,
  ResetAllUserRoles,
} from './loading-user-roles.actions';
import {
  hasLoadingAllUserRolesErroredSelector,
  shouldLoadAllUserRolesSelectors,
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
      tap(console.error.bind(null, '111')),
      withLatestFrom(
        this.store.select(shouldLoadAllUserRolesSelectors),
        (resetAction, shouldLoad) => [
          resetAction,
          shouldLoad && new LoadAllUserRoles(),
        ]
      ),
      map(actions => actions.filter(Boolean)),
      tap(console.error.bind(null, '222')),
      filter(actions => actions.length > 0),
      tap(console.error.bind(null, '333')),
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
