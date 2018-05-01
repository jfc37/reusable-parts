import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  emailAndPasswordSelector,
  isLoggingInSelector,
} from '@reusable-parts/login-page/src/+state/login.selectors';
import { Observable } from 'rxjs/Observable';
import {
  catchError,
  filter,
  mapTo,
  switchMap,
  withLatestFrom,
  exhaustMap,
} from 'rxjs/operators';
import {
  LoginActionTypes,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
} from './login.actions';
import { LoginState } from './login.reducer';
import { FirebaseLoginService } from '@reusable-parts/login-page/src/services/firebase-login.service';

@Injectable()
export class LoginEffects {
  @Effect()
  loginAttempt$ = this.actions$.pipe(
    ofType(LoginActionTypes.AttemptLogin),
    withLatestFrom(this.store.select(isLoggingInSelector)),
    filter(([action, isLoggingIn]) => !isLoggingIn),
    mapTo(new LoginRequest())
  );

  @Effect()
  loginRequest$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginRequest),
    withLatestFrom(this.store.select(emailAndPasswordSelector)),
    exhaustMap(([action, { email, password, rememberMe }]) =>
      this.loginService
        .login(email, password, rememberMe)
        .pipe(
          mapTo(new LoginSuccess()),
          catchError(error => Observable.of(new LoginFailure(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<LoginState>,
    private loginService: FirebaseLoginService
  ) {}
}
