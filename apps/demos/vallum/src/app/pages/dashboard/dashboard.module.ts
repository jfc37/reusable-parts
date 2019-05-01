import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, UserConfirmationDialogComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { PageWithNavModule } from '@reusable-parts/stateless/layouts/page-with-nav';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatProgressBarModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
} from '@angular/material';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { ShellComponent } from '../../shared/components/shell/shell.component';
import { UserTableComponent } from './components/user-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserSearchService } from './services/user-search.service';
import { NzBusinessModule, NZ_BUSINESS_API_CONFIG } from '@reusable-parts/logic/integration/nz-business';
import { CopperCrmModule, COPPER_CRM_CONFIG } from '@reusable-parts/logic/integration/copper-crm';
import { environment } from '../../../environments/environment';

const routes: Route[] = [
  {
    component: DashboardComponent,
    path: '',
  },
];

@NgModule({
  declarations: [DashboardComponent, ShellComponent, UserTableComponent, UserConfirmationDialogComponent],
  entryComponents: [UserConfirmationDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,

    PageWithNavModule,
    PageModule,
    NzBusinessModule,
    CopperCrmModule,
  ],
  providers: [
    UserSearchService,
    { provide: NZ_BUSINESS_API_CONFIG, useValue: environment.nzBusinessApi },
    { provide: COPPER_CRM_CONFIG, useValue: environment.copperCrm },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } as MatDialogConfig },
  ],
})
export class DashboardModule {}
