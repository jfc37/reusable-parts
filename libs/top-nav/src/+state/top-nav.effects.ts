import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/services/firebase-user.service';
import { mapTo, mergeMap, switchMapTo, tap, delay, switchMap, startWith, filter } from 'rxjs/operators';
import { defer } from 'rxjs/observable/defer';
import { InitialiseTopNav, SetAvatarUrl, SetDisplayName, SetLogInStatus, TopNavActionTypes } from './top-nav.actions';
import { Store } from '@ngrx/store';
import { TopNavState } from '@reusable-parts/top-nav/src/+state/top-nav.reducer';

@Injectable()
export class TopNavEffects {
  @Effect() initialise$ = this.actions$.ofType(TopNavActionTypes.Initialise)
    .pipe(
      startWith(null),
      tap(console.error.bind(null, '111')),
      switchMap(() => this.firebaseUser.getUser()),
      // switchMapTo(this.firebaseUser.getUser()),
      tap(console.error.bind(null, '222')),
      filter(Boolean),
      mergeMap(user => {
        const actions: any[] = [new SetLogInStatus(user.loggedIn)]

        if (user.loggedIn) {
          actions.push(new SetDisplayName(user.displayName));
          if (user.avatarUrl) {
            actions.push(new SetAvatarUrl(user.avatarUrl));
          }
        }
        return actions;
      }),
  );

  @Effect() logout$ = this.actions$.ofType(TopNavActionTypes.LogOut)
    .pipe(
      switchMapTo(this.firebaseUser.logout()),
      mapTo(new InitialiseTopNav()),
  )

  constructor(
    private actions$: Actions,
    private firebaseUser: FirebaseUserService,
    private store: Store<TopNavState>,
  ) { }
}
