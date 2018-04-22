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
  MealDeletingActionTypes,
  DeleteMeal,
  DeleteMealSuccess,
  DeleteMealFailure,
} from './meal-deleting.actions';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MealDeletingEffects {
  @Effect()
  delete$ = this.actions$.pipe(
    ofType<DeleteMeal>(MealDeletingActionTypes.Delete),
    mergeMap(action =>
      this.repository
        .delete(action.id)
        .pipe(
          mapTo(new DeleteMealSuccess(action.id)),
          catchError(err =>
            Observable.of(new DeleteMealFailure(action.id, err))
          )
        )
    )
  );

  constructor(private actions$: Actions, private repository: MealRepository) {}
}
