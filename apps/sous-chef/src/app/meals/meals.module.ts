import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMealsComponent } from './all-meals/all-meals.component';
import { MainContentModule } from '@reusable-parts/main-content';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    MainContentModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AllMealsComponent }
    ]),
  ],
  declarations: [AllMealsComponent]
})
export class MealsModule { }
