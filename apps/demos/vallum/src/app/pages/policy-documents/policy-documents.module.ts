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
  MatSnackBarModule,
  MatIconModule,
} from '@angular/material';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { AwsFileUploadModule } from '@reusable-parts/logic/integration/aws-file-upload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PolicyDocumentsComponent } from './policy-documents.component';
import { SharedModule } from '../../shared/shared.module';
import { ExistingPoliciesComponent } from './components/existing-policies.component';
import { DocumentHandler } from './services/document-handler';
import { UploadPolicyComponent } from './components/upload-policy.component';
import { LoaderComponent } from '@reusable-parts/stateless/components/loader';

const routes: Route[] = [
  {
    component: PolicyDocumentsComponent,
    path: '',
  },
];

@NgModule({
  declarations: [PolicyDocumentsComponent, ExistingPoliciesComponent, UploadPolicyComponent],
  entryComponents: [LoaderComponent],
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
    AwsFileUploadModule,
  ],
  providers: [DocumentHandler],
})
export class PolicyDocumentsModule {}
