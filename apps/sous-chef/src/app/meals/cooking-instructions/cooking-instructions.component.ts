import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
  takeUntil,
  map,
  distinctUntilChanged,
  tap,
  filter,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MealState } from '../+state/meals/meals.state';
import { SetCurrentSlug } from '../+state/meals/meals.actions';
import { GetAllMeals } from '../+state/meal-loading/meal-loading.actions';
import { Observable } from 'rxjs/Observable';
import {
  currentMealNameSelector,
  currentMealPrepWorkSelector,
  currentMealCookingStepsSelector,
} from '../+state/meals/meals.selectors';
import {
  isLoadingAllMealsSelector,
  hasFailedLoadingAllMealsSelector,
} from '../+state/meal-loading/meal-loading.selectors';

@Component({
  selector: 'jfc-cooking-instructions',
  templateUrl: './cooking-instructions.component.html',
  styleUrls: ['./cooking-instructions.component.scss'],
})
export class CookingInstructionsComponent implements OnInit, OnDestroy {
  public title$: Observable<string>;
  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public prepWork$: Observable<string[]>;
  public cookingSteps$: Observable<string[]>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    private router: ActivatedRoute,
    private store: Store<MealState>
  ) {}

  public ngOnInit(): void {
    this.router.params
      .pipe(
        takeUntil(this.onDestroy$),
        map(param => param['slug']),
        filter(Boolean),
        distinctUntilChanged(),
        tap(slug => this.store.dispatch(new SetCurrentSlug(slug)))
      )
      .subscribe();

    this.store.dispatch(new GetAllMeals());

    this.title$ = this.store
      .select(currentMealNameSelector)
      .pipe(filter(Boolean));
    this.loading$ = this.store.select(isLoadingAllMealsSelector);
    this.error$ = this.store
      .select(hasFailedLoadingAllMealsSelector)
      .pipe(
        map(
          hasFailed =>
            hasFailed && `Problem getting meal. Please try again later`
        )
      );
    this.prepWork$ = this.store
      .select(currentMealPrepWorkSelector)
      .pipe(filter(Boolean));
    this.cookingSteps$ = this.store
      .select(currentMealCookingStepsSelector)
      .pipe(filter(Boolean));
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
