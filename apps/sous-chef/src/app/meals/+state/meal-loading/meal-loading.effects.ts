import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, mapTo, withLatestFrom } from 'rxjs/operators';
import { MealsFeatureState } from '../meals-feature.state';
import { LoadAllFailureMeals, LoadAllMeals, MealLoadingActionTypes } from './meal-loading.actions';
import { shouldLoadAllMealsSelector } from './meal-loading.selectors';

@Injectable()
export class MealLoadingEffects {
  @Effect() getAll$ = this.actions$.pipe(
    ofType(MealLoadingActionTypes.GetAll),
    withLatestFrom(this.store.select(shouldLoadAllMealsSelector)),
    filter(([action, shouldLoad]) => shouldLoad),
    mapTo(new LoadAllMeals())
  );

  @Effect() loadAll$ = this.actions$.pipe(
    ofType(MealLoadingActionTypes.LoadAll),
    mapTo(new LoadAllFailureMeals('ERROR'))
  );

  constructor(
    private actions$: Actions,
    private store: Store<MealsFeatureState>,
  ) {}
}
