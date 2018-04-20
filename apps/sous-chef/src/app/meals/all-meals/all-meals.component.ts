import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { GetAllMeals } from '../+state/meal-loading/meal-loading.actions';
import { hasFailedLoadingAllMealsSelector, isLoadingAllMealsSelector } from '../+state/meal-loading/meal-loading.selectors';
import { MealsFeatureState } from '../+state/meals-feature.state';
import { hasNoMealsSelector } from '../+state/meals/meals.selectors';
import { allMealCardModelsSelector } from '../components/meal-card/meal-card.component.selectors';
import { MealCardModel } from '../components/meal-card/meal-card.component.model';
import { DeleteMeal } from '../+state/meal-deleting/meal-deleting.actions';
import { CreateMeal } from '../+state/new-meal/new-meal.actions';
import { isCreatingMealSelector, hasCreatedMealSelector } from '../+state/new-meal/new-meal.selectors';

@Component({
  selector: 'jfc-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss']
})
export class AllMealsComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public allMeals$: Observable<MealCardModel[]>;
  public hasNoMeals$: Observable<boolean>;
  public creating$: Observable<boolean>;
  public created$: Observable<boolean>;

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
    this.allMeals$ = this.store.select(allMealCardModelsSelector);
    this.creating$ = this.store.select(isCreatingMealSelector);
    this.created$ = this.store.select(hasCreatedMealSelector);
  }

  public delete(meal: MealCardModel): void {
    this.store.dispatch(new DeleteMeal(meal.id));
  }

  public mealTrackByFn(index: number, meal: MealCardModel) {
    return meal.id;
  }

  public create(name: string): void {
    this.store.dispatch(new CreateMeal(name));
  }

}
