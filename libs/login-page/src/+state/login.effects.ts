import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  LoginActions,
  LoginActionTypes,
} from './login.actions';
import { LoginState } from './login.reducer';
import { DataPersistence } from '@nrwl/nx';

@Injectable()
export class LoginEffects {
  // @Effect() loginAttempt$ = this.actions$.ofType(LoginActionTypes.AttemptLogin);

  // @Effect()
  // loadLogin$ = this.dataPersistence.fetch(LoginActionTypes.LoadLogin, {
  //   run: (action: LoadLogin, state: LoginState) => {
  //     return new LoginLoaded(state);
  //   },

  //   onError: (action: LoadLogin, error) => {
  //     console.error('Error', error);
  //   }
  // });

  constructor(
    private actions$: Actions,
  ) {}
}
