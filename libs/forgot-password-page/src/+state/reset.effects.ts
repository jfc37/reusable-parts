import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, filter, mapTo, switchMap, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { ResetActionTypes, ResetFailure, ResetRequest, ResetSuccess } from './reset.actions';
import { ResetState } from './reset.reducer';
import {
  isResettingSelector,
  emailResetSelector,
} from '@reusable-parts/forgot-password-page/src/+state/reset.selectors';
import { FirebaseResetService } from '@reusable-parts/forgot-password-page/src/services/firebase-reset.service';

@Injectable()
export class ResetEffects {
  @Effect()
  resetAttempt$ = this.actions$.pipe(
    ofType(ResetActionTypes.AttemptReset),
    withLatestFrom(this.store.select(isResettingSelector)),
    filter(([action, isResetting]) => !isResetting),
    mapTo(new ResetRequest()),
  );

  @Effect()
  resetRequest$ = this.actions$.pipe(
    ofType(ResetActionTypes.ResetRequest),
    withLatestFrom(this.store.select(emailResetSelector), (action, email) => email),
    exhaustMap(email =>
      this.resetService
        .reset(email)
        .pipe(mapTo(new ResetSuccess()), catchError(error => Observable.of(new ResetFailure(error)))),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<ResetState>,
    private resetService: FirebaseResetService,
  ) {}
}
