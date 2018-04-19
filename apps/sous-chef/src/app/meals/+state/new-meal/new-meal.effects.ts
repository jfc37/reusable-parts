import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, mapTo, mergeMap, switchMap, withLatestFrom, exhaustMap, map, catchError, delay } from 'rxjs/operators';
import { MealRepository } from '../../services/meal.repository';
import { NewMealActionTypes, CreateMealSuccess, CreateMeal, CreateMealFailure, ResetMeal } from './new-meal.actions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewMealEffects {
  @Effect() create$ = this.actions$.pipe(
    ofType<CreateMeal>(NewMealActionTypes.Create),
    map(action => action.name),
    exhaustMap(name => this.repository.create(name)),
    mapTo(new CreateMealSuccess()),
    catchError(err => Observable.of(new CreateMealFailure(err || 'Problem creating new meal'))),
  );

  @Effect() createSuccess$ = this.actions$.pipe(
    ofType<CreateMealSuccess>(NewMealActionTypes.CreateSuccess),
    delay(10),
    mapTo(new ResetMeal()),
  );

  constructor(
    private actions$: Actions,
    private repository: MealRepository,
  ) {}
}
