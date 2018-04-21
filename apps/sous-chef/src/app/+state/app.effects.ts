import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AppActions, AppActionTypes, SetMealItems } from './app.actions';
import { DataPersistence } from '@nrwl/nx';
import { startWith, mapTo } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';

@Injectable()
export class AppEffects {
  @Effect() effect$ = this.actions$.ofType(AppActionTypes.Initialise)
    .pipe(
      startWith(null),
      mapTo(new SetMealItems([{name: 'Chickpea Curry', slug: 'chickpea-curry'}])),
    );

  constructor(
    private actions$: Actions,
  ) {}
}
