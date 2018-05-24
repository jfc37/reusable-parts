import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, tap, mapTo } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { UserRoles } from '@reusable-parts/user-state/src/lib/user-roles/user-roles/user-roles.state';
import { User } from '@reusable-parts/user-state/src/lib/users/users/users.state';

@Injectable()
export class FirebaseUsersService {
  constructor(private af: AngularFireAuth) {}

  public getAllUserRoles(): Observable<UserRoles[]> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .collection('user-roles/')
          .get(),
      ).pipe(map(collection => collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public getUserRolesByRole(role: string): Observable<UserRoles[]> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .collection('user-roles/')
          .where(role, '==', true)
          .get(),
      ).pipe(map(collection => collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
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
          .get(),
      ).pipe(
        map(collection =>
          collection.docs.map(doc => ({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
          })),
        ),
      );
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public getUser(id: string): Observable<User> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .doc(`users/${id}`)
          .get(),
      ).pipe(
        map(doc => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
        })),
      );
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public addUserRole(id: string, role: string): Observable<void> {
    return this.setUserRole(id, role, true);
  }

  public removeUserRole(id: string, role: string): Observable<void> {
    return this.setUserRole(id, role, false);
  }

  private setUserRole(id: string, role: string, value: boolean): Observable<void> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .doc(`user-roles/${id}`)
          .update({ [role]: value }),
      ).pipe(mapTo(null));
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }
}
