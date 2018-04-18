import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainContentModule } from '@reusable-parts/main-content';

@NgModule({
  imports: [
    CommonModule,

    MainContentModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ]),
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
