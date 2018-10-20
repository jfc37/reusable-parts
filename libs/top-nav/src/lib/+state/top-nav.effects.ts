import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType(TopNavActionTypes.GetUser),
    switchMap(() => this.firebaseUser.getUser()),
    filter(Boolean),
    map(user => (user ? new Authenticated(user.displayName, user.avatarUrl, user.id) : new UnAuthenticated())),
  );

  @Effect()
  authenticated$: Observable<Action> = this.actions$.pipe(
    ofType<Authenticated>(TopNavActionTypes.Authenticated),
    map(action => new SetCurrentUser(action.userId)),
  );

  @Effect()
  logOut$ = this.actions$.pipe(
    ofType(TopNavActionTypes.LoggingOut),
    switchMap(() => this.firebaseUser.logout()),
    mapTo(new LoggedOut()),
  );

  @Effect()
  loggedOut$ = this.actions$.pipe(
    ofType(TopNavActionTypes.LoggingOut),
    map(() => new ResetCurrentUser()),
  );

  constructor(private actions$: Actions, private firebaseUser: FirebaseUserService) {}
}
