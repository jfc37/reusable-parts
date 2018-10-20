import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
  accountSelector,
  isRegisteringSelector,
} from '@reusable-parts/register-page/src/lib/+state/register.selectors';
import { FirebaseRegistrationService } from '@reusable-parts/register-page/src/lib/service/firebase-registration.service';
import { catchError, filter, mapTo, switchMap, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { RegisterActionTypes, RegisterFailure, RegisterRequest, RegisterSuccess } from './register.actions';
import { RegisterState } from './register.reducer';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RegisterEffects {
  @Effect()
  registerAttempt$ = this.actions$.pipe(
    ofType(RegisterActionTypes.AttemptRegister),
    withLatestFrom(this.store.pipe(select(isRegisteringSelector))),
    filter(([action, isRegistering]) => !isRegistering),
    mapTo(new RegisterRequest()),
  );

  @Effect()
  registerRequest$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterRequest),
    withLatestFrom(this.store.pipe(select(accountSelector))),
    exhaustMap(([action, { name, email, password }]) =>
      this.registrationService
        .register(name, email, password)
        .pipe(mapTo(new RegisterSuccess()), catchError(error => of(new RegisterFailure(error)))),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<RegisterState>,
    private registrationService: FirebaseRegistrationService,
  ) {}
}
