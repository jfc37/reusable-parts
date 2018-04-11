import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { catchError, concatMap } from 'rxjs/operators';

const DEFAULT_REGISTERATION_ERROR_MESSAGE = 'Registeration failed';
const FIREBASE_REGISTERATION_ERRORS = {
  ['auth/email-already-in-use']: 'Invalid email address',
  ['auth/invalid-email']: 'Invalid email address',
  ['auth/operation-not-allowed']: 'Registration is currently turned off',
  ['auth/weak-password']: 'Invalid password',
}

@Injectable()
export class FirebaseRegistrationService {
  constructor(private af: AngularFireAuth) { }

  public register(name: string, email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.af.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password))
      .pipe(
        concatMap(() => Observable.fromPromise(this.af.auth.currentUser.updateProfile({displayName: name, photoURL: undefined}))),
        catchError(error => {
          throw FIREBASE_REGISTERATION_ERRORS[error.code] || DEFAULT_REGISTERATION_ERROR_MESSAGE;
        })
      );
  }
}
