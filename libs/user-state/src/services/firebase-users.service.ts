import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { UserRoles } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.state';
import { User } from '@reusable-parts/user-state/src/users/users/users.state';

@Injectable()
export class FirebaseUsersService {
  constructor(private af: AngularFireAuth) {}

  public getAllUserRoles(): Observable<UserRoles[]> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .collection('user-roles/')
          .get()
      ).pipe(
        map(collection =>
          collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        )
      );
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public getAllUsers(): Observable<User[]> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .collection('users/')
          .get()
      ).pipe(
        tap(x => console.error('xxx', x)),
        map(collection =>
          collection.docs.map(doc => ({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
          }))
        )
      );
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }
}
