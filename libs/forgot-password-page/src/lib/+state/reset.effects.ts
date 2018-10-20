import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, filter, mapTo, switchMap, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { ResetActionTypes, ResetFailure, ResetRequest, ResetSuccess } from './reset.actions';
import { ResetState } from './reset.reducer';
import {
  isResettingSelector,
  emailResetSelector,
} from '@reusable-parts/forgot-password-page/src/lib/+state/reset.selectors';
import { FirebaseResetService } from '@reusable-parts/forgot-password-page/src/lib/services/firebase-reset.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ResetEffects {
  @Effect()
  resetAttempt$ = this.actions$.pipe(
    ofType(ResetActionTypes.AttemptReset),
    withLatestFrom(this.store.pipe(select(isResettingSelector))),
    filter(([action, isResetting]) => !isResetting),
    mapTo(new ResetRequest()),
  );

  @Effect()
  resetRequest$ = this.actions$.pipe(
    ofType(ResetActionTypes.ResetRequest),
    withLatestFrom(this.store.pipe(select(emailResetSelector)), (action, email) => email),
    exhaustMap(email =>
      this.resetService.reset(email).pipe(mapTo(new ResetSuccess()), catchError(error => of(new ResetFailure(error)))),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<ResetState>,
    private resetService: FirebaseResetService,
  ) {}
}
