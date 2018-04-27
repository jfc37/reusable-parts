import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class FirebaseUsersService {
  constructor(private af: AngularFireAuth) {}

  public getAllUserRoles(): Observable<any> {
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
  }
}
