import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoaderModule } from '@reusable-parts/stateless/components/loader';
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
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatIconModule,
} from '@angular/material';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PolicyDocumentsComponent } from './policy-documents.component';
import { SharedModule } from '../../shared/shared.module';
import { ExistingPoliciesComponent } from './components/existing-policies.component';
import { DocumentHandler } from './services/document-handler';
import { UploadPolicyComponent } from './components/upload-policy.component';

const routes: Route[] = [
  {
    component: PolicyDocumentsComponent,
    path: '',
  },
];

@NgModule({
  declarations: [PolicyDocumentsComponent, ExistingPoliciesComponent, UploadPolicyComponent],
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
    LoaderModule,
  ],
  providers: [
    DocumentHandler,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } as MatDialogConfig },
  ],
})
export class PolicyDocumentsModule {}
