import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { GetAllMeals } from '../+state/meal-loading/meal-loading.actions';
import { hasFailedLoadingAllMealsSelector, isLoadingAllMealsSelector } from '../+state/meal-loading/meal-loading.selectors';
import { MealsFeatureState } from '../+state/meals-feature.state';
import { hasNoMealsSelector } from '../+state/meals/meals.selectors';
import { allMealCardModelsSelector } from '../components/meal-card/meal-card.component.selectors';
import { MealCardModel, IngredientModel } from '../components/meal-card/meal-card.component.model';
import { DeleteMeal } from '../+state/meal-deleting/meal-deleting.actions';
import { CreateMeal } from '../+state/new-meal/new-meal.actions';
import { isCreatingMealSelector, hasCreatedMealSelector } from '../+state/new-meal/new-meal.selectors';
import { MatDialog } from '@angular/material';
import { MealCardComponent } from '../components/meal-card/meal-card.component';
import { UpdateMeal } from '../+state/meal-updating/meal-updating.actions';

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

  private screenWidth: number;
  private screenHeight: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private store: Store<MealsFeatureState>,
    private dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.onResize();

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

  public updateLink(link: string, meal: MealCardModel): void {
    this.store.dispatch(new UpdateMeal(meal.id, { link }));
  }

  public updateIngredients(ingredients: IngredientModel[], meal: MealCardModel): void {
    this.store.dispatch(new UpdateMeal(meal.id, { ingredients }));
  }

  public updatePreparations(preparationSteps: string[], meal: MealCardModel): void {
    this.store.dispatch(new UpdateMeal(meal.id, { preparationSteps }));
  }

  public updateCookingSteps(cookingSteps: string[], meal: MealCardModel): void {
    this.store.dispatch(new UpdateMeal(meal.id, { cookingSteps }));
  }

  public expand(meal: MealCardModel): void {
    const dialogRef = this.dialog.open(MealCardComponent, {
      height: this.screenHeight + 'px',
      width: this.screenWidth + 'px',
      data: {
        model: meal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
