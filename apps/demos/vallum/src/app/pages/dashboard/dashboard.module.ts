import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { PageWithNavModule } from '@reusable-parts/stateless/layouts/page-with-nav';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const routes: Route[] = [
  {
    component: DashboardComponent,
    path: '',
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PageWithNavModule, MatFormFieldModule, MatInputModule],
})
export class DashboardModule {}
