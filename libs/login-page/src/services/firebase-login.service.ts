import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

const DEFAULT_LOGIN_ERROR_MESSAGE = 'Login failed';
const FIREBASE_LOGIN_ERRORS = {
  ['auth/invalid-email']: 'Incorrect email or password',
  ['auth/user-not-found']: 'Incorrect email or password',
  ['auth/wrong-password']: 'Incorrect email or password',
  ['auth/user-disabled']: 'Your account has been disabled',
};

@Injectable()
export class FirebaseLoginService {
  constructor(private af: AngularFireAuth) {}

  public login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<any> {
    return this.setSessionPersistence(rememberMe).pipe(
      switchMap(() => this.authenticate(email, password)),
      catchError(error => {
        throw FIREBASE_LOGIN_ERRORS[error.code] || DEFAULT_LOGIN_ERROR_MESSAGE;
      })
    );
  }

  private setSessionPersistence(rememberMe: boolean): Observable<void> {
    const persistence = rememberMe ? 'local' : 'session';
    return fromPromise(this.af.auth.setPersistence(persistence));
  }

  private authenticate(email: string, password: string): Observable<void> {
    return Observable.fromPromise(
      this.af.auth.signInWithEmailAndPassword(email, password)
    );
  }
}
