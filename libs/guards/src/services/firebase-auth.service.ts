import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map, take, switchMap, pluck, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class FirebaseAuthService {
  constructor(private af: AngularFireAuth) {}

  public isAuthenticated(): Observable<boolean> {
    return this.af.authState.pipe(map(user => Boolean(user)));
  }

  public hasRole(role: string): Observable<boolean> {
    return this.af.authState.pipe(
      map(user => user.uid),
      take(1),
      switchMap(uid =>
        fromPromise(
          this.af.app
            .firestore()
            .doc(`user-roles/${uid}`)
            .get()
            .then(doc => doc.data())
        )
      ),
      pluck(role),
      map(Boolean)
    );
  }
}
