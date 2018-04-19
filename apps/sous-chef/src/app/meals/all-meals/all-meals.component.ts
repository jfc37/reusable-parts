import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { GetAllMeals } from '../+state/meal-loading/meal-loading.actions';
import { hasFailedLoadingAllMealsSelector, isLoadingAllMealsSelector } from '../+state/meal-loading/meal-loading.selectors';
import { MealsFeatureState } from '../+state/meals-feature.state';
import { hasNoMealsSelector } from '../+state/meals/meals.selectors';
import { allMealSummaryCardModelsSelector } from '../components/meal-summary-card/meal-summary-card.component.selectors';
import { MealSummaryCardModel } from '../components/meal-summary-card/meal-summary-card.component.model';
import { DeleteMeal } from '../+state/meal-deleting/meal-deleting.actions';
import { CreateMeal } from '../+state/new-meal/new-meal.actions';

@Component({
  selector: 'jfc-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss']
})
export class AllMealsComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public allMeals$: Observable<MealSummaryCardModel[]>;
  public hasNoMeals$: Observable<boolean>;

  constructor(
    private store: Store<MealsFeatureState>,
  ) { }

  public ngOnInit() {
    this.store.dispatch(new GetAllMeals());

    this.loading$ = this.store.select(isLoadingAllMealsSelector);
    this.error$ = this.store.select(hasFailedLoadingAllMealsSelector).pipe(
      map(hasFailed => hasFailed && `Problem getting meals. Please try again later`)
    );

    this.hasNoMeals$ = this.store.select(hasNoMealsSelector);
    this.allMeals$ = this.store.select(allMealSummaryCardModelsSelector);
  }

  public delete(meal: MealSummaryCardModel): void {
    this.store.dispatch(new DeleteMeal(meal.id));
  }

  public mealTrackByFn(index: number, meal: MealSummaryCardModel) {
    return meal.id;
  }

  public create(name: string): void {
    this.store.dispatch(new CreateMeal(name));
  }

}
