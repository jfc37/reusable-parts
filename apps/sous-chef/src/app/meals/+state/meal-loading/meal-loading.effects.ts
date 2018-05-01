import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  filter,
  mapTo,
  withLatestFrom,
  mergeMap,
  switchMap,
  exhaustMap,
} from 'rxjs/operators';
import { MealsFeatureState } from '../meals-feature.state';
import {
  LoadAllFailureMeals,
  LoadAllMeals,
  MealLoadingActionTypes,
  LoadAllSuccessMeals,
} from './meal-loading.actions';
import { shouldLoadAllMealsSelector } from './meal-loading.selectors';
import { SetMeals } from '../meals/meals.actions';
import { MealRepository } from '../../services/meal.repository';

@Injectable()
export class MealLoadingEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(MealLoadingActionTypes.GetAll),
    withLatestFrom(this.store.select(shouldLoadAllMealsSelector)),
    filter(([action, shouldLoad]) => shouldLoad),
    mapTo(new LoadAllMeals())
  );

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofType(MealLoadingActionTypes.LoadAll),
    exhaustMap(() => this.repository.getAll()),
    mergeMap(meals => [new SetMeals(...meals), new LoadAllSuccessMeals()])
  );

  constructor(
    private actions$: Actions,
    private store: Store<MealsFeatureState>,
    private repository: MealRepository
  ) {}
}
