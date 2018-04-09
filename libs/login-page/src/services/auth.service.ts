import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth) { }

  public login(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.af.auth.signInWithEmailAndPassword(email, password));
  }
}
