import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/services/firebase-user.service';
import { filter, map, switchMapTo } from 'rxjs/operators';
import { Authenticated, TopNavActionTypes, UnAuthenticated } from './top-nav.actions';

@Injectable()
export class TopNavEffects {
  @Effect() getUser$ = this.actions$.ofType(TopNavActionTypes.GetUser)
    .pipe(
      switchMapTo(this.firebaseUser.getUser()),
      filter(Boolean),
      map(user => user
        ? new Authenticated(user.displayName, user.avatarUrl)
        : new UnAuthenticated()
      ),
  );

  constructor(
    private actions$: Actions,
    private firebaseUser: FirebaseUserService,
  ) { }
}
