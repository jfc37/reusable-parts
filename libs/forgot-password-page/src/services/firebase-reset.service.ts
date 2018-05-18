import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { ForgotPasswordPageConfig } from '@reusable-parts/common-config/src/environment/forgot-password-page.config';

const DEFAULT_RESET_ERROR_MESSAGE = 'Reset failed';
const FIREBASE_RESET_ERRORS = {
  ['auth/invalid-email']: 'Invalid email',
};

@Injectable()
export class FirebaseResetService {
  constructor(
    private af: AngularFireAuth,
    @Inject('forgotPasswordPageConfig') private config: ForgotPasswordPageConfig,
    @Inject('BASEURL') private baseUrl: string,
  ) {}

  public reset(email: string): Observable<any> {
    return fromPromise(
      this.af.auth.sendPasswordResetEmail(email, { url: `${this.baseUrl}/${this.config.loginRoute}` }),
    ).pipe(
      catchError(error => {
        if (error.code === 'auth/user-not-found') {
          return of(null);
        }

        throw FIREBASE_RESET_ERRORS[error.code] || DEFAULT_RESET_ERROR_MESSAGE;
      }),
    );
  }
}
