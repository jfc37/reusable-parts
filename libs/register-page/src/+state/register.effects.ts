import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { accountSelector, isRegisteringSelector } from '@reusable-parts/register-page/src/+state/register.selectors';
import { Observable } from 'rxjs/Observable';
import { catchError, filter, mapTo, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { RegisterActionTypes, RegisterFailure, RegisterRequest, RegisterSuccess } from './register.actions';
import { RegisterState } from './register.reducer';
import { FirebaseRegistrationService } from '@reusable-parts/register-page/src/service/firebase-registration.service';

@Injectable()
export class RegisterEffects {
  @Effect() registerAttempt$ = this.actions$.pipe(
    ofType(RegisterActionTypes.AttemptRegister),
    withLatestFrom(this.store.select(isRegisteringSelector)),
    filter(([action, isLoggingIn]) => !isLoggingIn),
    mapTo(new RegisterRequest())
  );

  @Effect() registerRequest$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterRequest),
    withLatestFrom(this.store.select(accountSelector)),
    switchMap(
      ([action, {email, password}]) => this.registrationService.register(email, password).pipe(
        tap(console.error.bind(null, 'xxx')),
        mapTo(new RegisterSuccess()),
        catchError(error => Observable.of(new RegisterFailure(error.message))),
      )
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<RegisterState>,
    private registrationService: FirebaseRegistrationService,
  ) {}
}
