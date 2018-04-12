import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  TopNavActions,
  TopNavActionTypes,
  LoadTopNav,
  TopNavLoaded
} from './top-nav.actions';
import { TopNavState } from './top-nav.reducer';
import { DataPersistence } from '@nrwl/nx';

@Injectable()
export class TopNavEffects {
  @Effect() effect$ = this.actions$.ofType(TopNavActionTypes.TopNavAction);

  @Effect()
  loadTopNav$ = this.dataPersistence.fetch(TopNavActionTypes.LoadTopNav, {
    run: (action: LoadTopNav, state: TopNavState) => {
      return new TopNavLoaded(state);
    },

    onError: (action: LoadTopNav, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TopNavState>
  ) {}
}
