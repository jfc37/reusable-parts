import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { PageWithNavModule } from '@reusable-parts/stateless/layouts/page-with-nav';
import { MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { ShellComponent } from '../../shared/components/shell/shell.component';

const routes: Route[] = [
  {
    component: DashboardComponent,
    path: '',
  },
];

@NgModule({
  declarations: [DashboardComponent, ShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageWithNavModule,
    PageModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class DashboardModule {}
