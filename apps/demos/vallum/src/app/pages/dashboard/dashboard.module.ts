import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { PageWithNavModule } from '@reusable-parts/stateless/layouts/page-with-nav';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule } from '@angular/material';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { ShellComponent } from '../../shared/components/shell/shell.component';
import { UserTableComponent } from './components/user-table.component';

const routes: Route[] = [
  {
    component: DashboardComponent,
    path: '',
  },
];

@NgModule({
  declarations: [DashboardComponent, ShellComponent, UserTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,

    PageWithNavModule,
    PageModule,
  ],
})
export class DashboardModule {}
