import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class FirebaseUsersService {
  constructor(private af: AngularFireAuth) {}

  public getAllUserRoles(): Observable<any> {
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
}
