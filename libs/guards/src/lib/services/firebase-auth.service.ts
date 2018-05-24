import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map, take, switchMap, pluck, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirebaseAuthService {
  constructor(private af: AngularFireAuth, private angularFirestore: AngularFirestore) {}

  public isAuthenticated(): Observable<boolean> {
    return this.af.authState.pipe(map(user => Boolean(user)));
  }

  public hasRole(role: string): Observable<boolean> {
    return this.af.authState.pipe(
      map(user => user.uid),
      take(1),
      switchMap(uid =>
        fromPromise(
          this.angularFirestore.firestore
            .doc(`user-roles/${uid}`)
            .get()
            .then(doc => doc.data()),
        ),
      ),
      map(userRoles => userRoles && userRoles[role]),
      map(Boolean),
    );
  }
}
