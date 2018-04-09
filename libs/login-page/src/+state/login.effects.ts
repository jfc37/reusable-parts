import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LoginActions,
  LoginActionTypes,
  LoginRequest,
} from './login.actions';
import { LoginState } from './login.reducer';
import { DataPersistence } from '@nrwl/nx';
import { withLatestFrom, filter, mapTo, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { isLoggingInSelector } from '@reusable-parts/login-page/src/+state/login.selectors';

@Injectable()
export class LoginEffects {
  @Effect() loginAttempt$ = this.actions$.pipe(
    ofType(LoginActionTypes.AttemptLogin),
    withLatestFrom(this.store.select(isLoggingInSelector)),
    tap(console.error.bind(null, 'xxx')),
    filter(([action, isLoggingIn]) => !isLoggingIn),
    mapTo(new LoginRequest())
  );

  constructor(
    private actions$: Actions,
    private store: Store<LoginState>,
  ) {}
}
