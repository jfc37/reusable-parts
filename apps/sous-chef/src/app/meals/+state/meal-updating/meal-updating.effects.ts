import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  filter,
  mapTo,
  mergeMap,
  switchMap,
  withLatestFrom,
  exhaustMap,
  catchError,
} from 'rxjs/operators';
import { MealRepository } from '../../services/meal.repository';
import {
  MealUpdatingActionTypes,
  UpdateMeal,
  UpdateMealSuccess,
  UpdateMealFailure,
} from './meal-updating.actions';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MealUpdatingEffects {
  @Effect()
  update$ = this.actions$.pipe(
    ofType<UpdateMeal>(MealUpdatingActionTypes.Update),
    mergeMap(action =>
      this.repository
        .update(action.id, action.meal)
        .pipe(
          mapTo(new UpdateMealSuccess(action.id)),
          catchError(err =>
            Observable.of(new UpdateMealFailure(action.id, err))
          )
        )
    )
  );

  constructor(private actions$: Actions, private repository: MealRepository) {}
}
