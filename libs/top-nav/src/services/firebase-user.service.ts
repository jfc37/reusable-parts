import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseUserService {
  constructor(private af: AngularFireAuth) {}

  public getUser(): Observable<{ displayName: string; avatarUrl: string; id: string }> {
    return this.af.authState.pipe(
      map(
        user =>
          user
            ? {
                displayName: user.displayName || user.email,
                avatarUrl: user.photoURL,
                id: user.uid,
              }
            : null,
      ),
    );
  }

  public logout(): Observable<void> {
    return Observable.fromPromise(this.af.auth.signOut());
  }
}
