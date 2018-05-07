import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {
  catchError,
  concatMap,
  concat,
  tap,
  map,
  mapTo,
  mergeMap,
} from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

const DEFAULT_REGISTERATION_ERROR_MESSAGE = 'Registeration failed';
const FIREBASE_REGISTERATION_ERRORS = {
  ['auth/email-already-in-use']: 'Invalid email address',
  ['auth/invalid-email']: 'Invalid email address',
  ['auth/operation-not-allowed']: 'Registration is currently turned off',
  ['auth/weak-password']: 'Invalid password',
};

@Injectable()
export class FirebaseRegistrationService {
  constructor(
    private af: AngularFireAuth,
    @Inject('defaultNewUserRoles') private defaultRoles: any
  ) {
    if (!defaultRoles) {
      throw new Error(
        `No injector provided for 'defaultNewUserRoles', check you've included it in app.module`
      );
    }
  }

  public register(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.createAccount(email, password).pipe(
      mergeMap(uid => [
        this.setRoles(uid),
        this.setUser(uid, name, email),
        this.updateName(name),
      ]),
      catchError(error => {
        throw FIREBASE_REGISTERATION_ERRORS[error.code] ||
          DEFAULT_REGISTERATION_ERROR_MESSAGE;
      })
    );
  }

  private createAccount(email: string, password: string): Observable<string> {
    return Observable.fromPromise(
      this.af.auth.createUserAndRetrieveDataWithEmailAndPassword(
        email,
        password
      )
    ).pipe(map(response => response.user.uid));
  }

  private updateName(name: string): Observable<void> {
    return Observable.fromPromise(
      this.af.auth.currentUser.updateProfile({
        displayName: name,
        photoURL: undefined,
      })
    );
  }

  private setRoles(uid: string): Observable<string> {
    return fromPromise(
      this.af.app
        .firestore()
        .doc('user-roles/' + uid)
        .set(this.defaultRoles)
    ).pipe(mapTo(uid));
  }

  private setUser(
    uid: string,
    name: string,
    email: string
  ): Observable<string> {
    return fromPromise(
      this.af.app
        .firestore()
        .doc('users/' + uid)
        .set({ name, email })
    ).pipe(mapTo(uid));
  }
}
