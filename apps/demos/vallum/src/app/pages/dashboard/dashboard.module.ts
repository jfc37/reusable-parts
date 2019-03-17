import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { PageWithNavModule } from '@reusable-parts/stateless/layouts/page-with-nav';

const routes: Route[] = [
  {
    component: DashboardComponent,
    path: '',
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PageWithNavModule],
})
export class DashboardModule {}
