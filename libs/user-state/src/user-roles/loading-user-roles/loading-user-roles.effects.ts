import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  LoadingUserRolesActionTypes,
  LoadAllUserRoles,
} from './loading-user-roles.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class LoadingUserRolesEffects {
  @Effect()
  getAll$ = this.actions$
    .ofType(LoadingUserRolesActionTypes.GetAll)
    .pipe(map(() => new LoadAllUserRoles()));

  constructor(private actions$: Actions) {}
}
