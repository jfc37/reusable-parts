import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

const DEFAULT_LOGIN_ERROR_MESSAGE = 'Login failed';
const FIREBASE_LOGIN_ERRORS = {
  ['auth/invalid-email']: 'Incorrect email or password',
  ['auth/user-not-found']: 'Incorrect email or password',
  ['auth/wrong-password']: 'Incorrect email or password',
  ['auth/user-disabled']: 'Your account has been disabled',
}

@Injectable()
export class FirebaseLoginService {
  constructor(private af: AngularFireAuth) { }

  public login(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.af.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        catchError(error => {
          throw FIREBASE_LOGIN_ERRORS[error.code] || DEFAULT_LOGIN_ERROR_MESSAGE;
        })
      );
  }
}
