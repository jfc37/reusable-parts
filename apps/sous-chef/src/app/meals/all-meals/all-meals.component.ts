import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { GetAllMeals } from '../+state/meal-loading/meal-loading.actions';
import { hasFailedLoadingAllMealsSelector, isLoadingAllMealsSelector } from '../+state/meal-loading/meal-loading.selectors';
import { MealsFeatureState } from '../+state/meals-feature.state';
import { hasMealsSelector } from '../+state/meals/meals.selectors';
import { allMealSummaryCardModelsSelector } from '../components/meal-summary-card/meal-summary-card.component.selectors';

@Component({
  selector: 'jfc-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss']
})
export class AllMealsComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public allMeals$: Observable<any>;
  public hasMeals$: Observable<boolean>;

  constructor(
    private store: Store<MealsFeatureState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetAllMeals());

    this.loading$ = this.store.select(isLoadingAllMealsSelector);
    this.error$ = this.store.select(hasFailedLoadingAllMealsSelector).pipe(
      map(hasFailed => hasFailed && `Problem getting meals. Please try again later`)
    );

    this.hasMeals$ = this.store.select(hasMealsSelector);
    this.allMeals$ = this.store.select(allMealSummaryCardModelsSelector);
  }

}
