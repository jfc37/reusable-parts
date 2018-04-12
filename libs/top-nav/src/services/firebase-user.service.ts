import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class FirebaseUserService {

  constructor(private af: AngularFireAuth) { }

  public userStatusChanges(): Observable<void> {
    return this.af.authState.pipe(mapTo(null));
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
    return Observable.fromPromise(this.af.auth.signOut())
  }

}
