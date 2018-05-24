import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  ResetCurrentUser,
  SetCurrentUser,
} from '@reusable-parts/current-user-state/src/current-user/current-user.actions';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/lib/services/firebase-user.service';
import { Observable } from 'rxjs/Observable';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { Authenticated, LoggedOut, TopNavActionTypes, UnAuthenticated } from './top-nav.actions';

@Injectable()
export class TopNavEffects {
  @Effect()
  getUser$: Observable<Action> = this.actions$
    .ofType(TopNavActionTypes.GetUser)
    .pipe(
      switchMap(() => this.firebaseUser.getUser()),
      filter(Boolean),
      map(user => (user ? new Authenticated(user.displayName, user.avatarUrl, user.id) : new UnAuthenticated())),
    );

  @Effect()
  authenticated$: Observable<Action> = this.actions$
    .ofType<Authenticated>(TopNavActionTypes.Authenticated)
    .pipe(map(action => new SetCurrentUser(action.userId)));

  @Effect()
  logOut$ = this.actions$
    .ofType(TopNavActionTypes.LoggingOut)
    .pipe(switchMap(() => this.firebaseUser.logout()), mapTo(new LoggedOut()));

  @Effect() loggedOut$ = this.actions$.ofType(TopNavActionTypes.LoggingOut).pipe(map(() => new ResetCurrentUser()));

  constructor(private actions$: Actions, private firebaseUser: FirebaseUserService) {}
}
