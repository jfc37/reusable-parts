import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocumentHandler } from './services/document-handler';
import { Observable } from 'rxjs';
import { PolicyRow } from './components/existing-policies.component';
import { finalize } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoaderComponent } from '@reusable-parts/stateless/components/loader/src/lib/loader/loader.component';

@Component({
  selector: 'vallum-policy-documents',
  template: `
    <vallum-shell [contentTemplate]="shellContent"></vallum-shell>
    <vallum-upload-policy (upload)="upload($event)"></vallum-upload-policy>

    <ng-template #shellContent>
      <stateless-page
        headerType="hero"
        [headerTemplate]="headerTemplate"
        [headerSubtextTemplate]="headerSubtextTemplate"
        [contentTemplate]="bodyTemplate"
      ></stateless-page>
    </ng-template>

    <ng-template #headerTemplate>
      <div class="p-24">
        My policies
      </div>
    </ng-template>

    <ng-template #headerSubtextTemplate>
      <div class="p-24">
        Upload and download policy documents
      </div>
    </ng-template>

    <ng-template #bodyTemplate>
      <mat-card>
        <vallum-existing-policies
          [loading]="loadingDocuments$ | async"
          [errorLoading]="errorLoadingDocuments$ | async"
          [rows]="rows$ | async"
          (download)="downloadFile($event)"
        ></vallum-existing-policies>
      </mat-card>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDocumentsComponent implements OnInit {
  public rows$: Observable<PolicyRow[]>;
  public loadingDocuments$: Observable<boolean>;
  public errorLoadingDocuments$: Observable<boolean>;

  constructor(private documentHandler: DocumentHandler, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.loadingDocuments$ = this.documentHandler.loading$;
    this.errorLoadingDocuments$ = this.documentHandler.errorLoading$;
    this.rows$ = this.documentHandler.documents$;
    this.documentHandler.loadDocuments();
  }

  public upload(file: File): void {
    const loader = this.dialog.open(LoaderComponent, { disableClose: true });
    this.documentHandler
      .upload(file)
      .pipe(finalize(() => loader.close()))
      .subscribe({
        complete: () => this.snackBar.open('Successfully uploaded policy', 'Ok'),
        error: () => this.snackBar.open('Problem uploading policy', 'Ok'),
      });
  }

  public downloadFile(key: string): void {
    this.documentHandler.viewDocument(key);
  }
}
