import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  LoadingUserRolesActionTypes,
  LoadAllUserRoles,
} from './loading-user-roles.actions';
import { map, filter, mapTo, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserFeatureState } from '@reusable-parts/user-state/src/user-feature.reducer';
import { shouldLoadAllUserRolesSelectors } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.selectors';

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

  constructor(
    private actions$: Actions,
    private store: Store<UserFeatureState>
  ) {}
}
