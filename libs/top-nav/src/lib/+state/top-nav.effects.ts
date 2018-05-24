import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/lib/services/firebase-user.service';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { Authenticated, LoggedOut, TopNavActionTypes, UnAuthenticated } from './top-nav.actions';

@Injectable()
export class TopNavEffects {
  @Effect()
  getUser$ = this.actions$
    .ofType(TopNavActionTypes.GetUser)
    .pipe(
      switchMap(() => this.firebaseUser.getUser()),
      filter(Boolean),
      map(user => (user ? new Authenticated(user.displayName, user.avatarUrl) : new UnAuthenticated())),
    );

  @Effect()
  logOut$ = this.actions$
    .ofType(TopNavActionTypes.LoggingOut)
    .pipe(switchMap(() => this.firebaseUser.logout()), mapTo(new LoggedOut()));

  constructor(private actions$: Actions, private firebaseUser: FirebaseUserService) {}
}
