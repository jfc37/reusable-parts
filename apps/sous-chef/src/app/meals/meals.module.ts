import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMealsComponent } from './all-meals/all-meals.component';
import { MainContentModule } from '@reusable-parts/main-content';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { mealsFeatureReducer } from './+state/meals-feature.state';
import { MealLoadingEffects } from './+state/meal-loading/meal-loading.effects';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { MatButtonModule, MatMenuModule, MatIconModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';
import { MealRepository } from './services/meal.repository';
import { MealDeletingEffects } from './+state/meal-deleting/meal-deleting.effects';
import { NewMealCardComponent } from './components/new-meal-card/new-meal-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMealEffects } from './+state/new-meal/new-meal.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MealUpdatingEffects } from './+state/meal-updating/meal-updating.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MainContentModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AllMealsComponent }
    ]),

    StoreModule.forFeature('meals', mealsFeatureReducer),
    EffectsModule.forFeature([MealLoadingEffects, MealDeletingEffects, NewMealEffects, MealUpdatingEffects])

  ],
  declarations: [AllMealsComponent, MealCardComponent, NewMealCardComponent],
  entryComponents: [MealCardComponent],
  providers: [
    MealLoadingEffects,
    MealDeletingEffects,
    NewMealEffects,
    MealUpdatingEffects,
    MealRepository,
  ]
})
export class MealsModule { }
