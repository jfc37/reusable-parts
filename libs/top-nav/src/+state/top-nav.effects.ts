import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/services/firebase-user.service';
import { Observable } from 'rxjs/Observable';
import { mergeMap, switchMapTo, flatMap } from 'rxjs/operators';
import { SetLogInStatus, SetAvatarUrl, SetDisplayName, TopNavActionTypes } from './top-nav.actions';

@Injectable()
export class TopNavEffects {
  @Effect() effect$: Observable<any> = this.actions$.ofType(TopNavActionTypes.Initialise)
    .pipe(
      switchMapTo(this.firebaseUser.userStatusChanges()),
      flatMap(() => {
        const isLoggedIn = this.firebaseUser.isLoggedIn();
        const actions: any[] = [new SetLogInStatus(isLoggedIn)]

        if (isLoggedIn) {
          actions.push(new SetDisplayName(this.firebaseUser.getDisplayName()));
          if (this.firebaseUser.getAvatarUrl()) {
            actions.push(new SetAvatarUrl(this.firebaseUser.getAvatarUrl()));
          }
        }
        return actions;
      }),
  );

  constructor(
    private actions$: Actions,
    private firebaseUser: FirebaseUserService,
  ) { }
}
