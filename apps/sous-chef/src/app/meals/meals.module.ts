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
import { MatButtonModule, MatMenuModule, MatIconModule, MatGridListModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MealRepository } from './services/meal.repository';
import { MealDeletingEffects } from './+state/meal-deleting/meal-deleting.effects';
import { EditableMealCardComponent } from './components/editable-meal-card/editable-meal-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MainContentModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AllMealsComponent }
    ]),

    StoreModule.forFeature('meals', mealsFeatureReducer),
    EffectsModule.forFeature([MealLoadingEffects, MealDeletingEffects])

  ],
  declarations: [AllMealsComponent, MealSummaryCardComponent, EditableMealCardComponent],
  providers: [
    MealLoadingEffects,
    MealDeletingEffects,
    MealRepository,
  ]
})
export class MealsModule { }
