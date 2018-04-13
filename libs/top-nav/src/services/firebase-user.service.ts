import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseUserService {

  constructor(private af: AngularFireAuth) { }


  public getUser(): Observable<any> {
    return this.af.authState.pipe(
      map(user => user ? {
        loggedIn: true,
        displayName: user.displayName || user.email,
        avatarUrl: user.photoURL,
      } : { loggedIn: false, displayName: null, avatarUrl: null }),
    );
  }

  public isLoggedIn(): boolean {
    return Boolean(this.af.auth.currentUser)
  }

  public getDisplayName(): string {
    return this.af.auth.currentUser.displayName || this.af.auth.currentUser.email;
  }

  public getAvatarUrl(): string {
    return this.af.auth.currentUser.photoURL;
  }

  public logout(): Observable<void> {
    return Observable.fromPromise(this.af.auth.signOut());
  }

}
