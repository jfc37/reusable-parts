import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMealsComponent } from './all-meals/all-meals.component';
import { MainContentModule } from '@reusable-parts/main-content';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { mealsFeatureReducer } from './+state/meals-feature.state';
import { MealLoadingEffects } from './+state/meal-loading/meal-loading.effects';
import { MealSummaryCardComponent } from './components/meal-summary-card/meal-summary-card.component';
import { MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { MealRepository } from './services/meal.repository';

@NgModule({
  imports: [
    CommonModule,

    MainContentModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AllMealsComponent }
    ]),

    StoreModule.forFeature('meals', mealsFeatureReducer),
    EffectsModule.forFeature([MealLoadingEffects])

  ],
  declarations: [AllMealsComponent, MealSummaryCardComponent],
  providers: [
    MealLoadingEffects,
    MealRepository,
  ]
})
export class MealsModule { }
