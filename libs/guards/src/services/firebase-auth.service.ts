import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService {
  constructor(private af: AngularFireAuth) {}

  public isAuthenticated(): Observable<boolean> {
    return this.af.authState.pipe(map(user => Boolean(user)));
  }
}
