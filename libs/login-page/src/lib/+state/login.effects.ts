import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
  emailAndPasswordSelector,
  isLoggingInSelector,
} from '@reusable-parts/login-page/src/lib/+state/login.selectors';
import { catchError, filter, mapTo, switchMap, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { LoginActionTypes, LoginFailure, LoginRequest, LoginSuccess } from './login.actions';
import { LoginState } from './login.reducer';
import { FirebaseLoginService } from '@reusable-parts/login-page/src/lib/services/firebase-login.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoginEffects {
  @Effect()
  loginAttempt$ = this.actions$.pipe(
    ofType(LoginActionTypes.AttemptLogin),
    withLatestFrom(this.store.pipe(select(isLoggingInSelector))),
    filter(([action, isLoggingIn]) => !isLoggingIn),
    mapTo(new LoginRequest()),
  );

  @Effect()
  loginRequest$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginRequest),
    withLatestFrom(this.store.pipe(select(emailAndPasswordSelector))),
    exhaustMap(([action, { email, password, rememberMe }]) =>
      this.loginService
        .login(email, password, rememberMe)
        .pipe(mapTo(new LoginSuccess()), catchError(error => of(new LoginFailure(error)))),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<LoginState>,
    private loginService: FirebaseLoginService,
  ) {}
}
