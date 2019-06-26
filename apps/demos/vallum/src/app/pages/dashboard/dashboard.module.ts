import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { LoaderModule } from '@reusable-parts/stateless/components/loader';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { UserTableComponent } from './components/user-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserSearchService } from './services/user-search.service';
import { NzBusinessModule, NZ_BUSINESS_API_CONFIG } from '@reusable-parts/logic/integration/nz-business';
import { CopperCrmModule, COPPER_CRM_CONFIG } from '@reusable-parts/logic/integration/copper-crm';
import { environment } from '../../../environments/environment';
import { UserConfirmationDialogComponent } from './components/user-confirmation-dialog.component';
import { UserSearchComponent } from './components/user-search.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
    component: DashboardComponent,
    path: '',
  },
];

@NgModule({
  declarations: [DashboardComponent, UserTableComponent, UserSearchComponent, UserConfirmationDialogComponent],
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
    MatSnackBarModule,
    MatIconModule,

    SharedModule,

    PageModule,
    NzBusinessModule,
    CopperCrmModule,
    LoaderModule,
  ],
  providers: [
    UserSearchService,
    { provide: NZ_BUSINESS_API_CONFIG, useValue: environment.nzBusinessApi },
    { provide: COPPER_CRM_CONFIG, useValue: environment.copperCrm },
  ],
})
export class DashboardModule {}
