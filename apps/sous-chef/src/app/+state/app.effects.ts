import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { startWith, switchMap, map, exhaustMap } from 'rxjs/operators';
import { AppActionTypes, SetMealItems } from './app.actions';
import { AppRepository } from './app.repository';

@Injectable()
export class AppEffects {
  @Effect()
  effect$ = this.actions$
    .ofType(AppActionTypes.Initialise)
    .pipe(
      startWith(null),
      exhaustMap(() => this.repository.getAllMealItems()),
      map(items => new SetMealItems(items))
    );

  constructor(private actions$: Actions, private repository: AppRepository) {}
}
