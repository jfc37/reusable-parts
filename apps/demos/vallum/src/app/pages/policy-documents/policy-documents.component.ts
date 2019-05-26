import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocumentHandler } from './services/document-handler';
import { Observable } from 'rxjs';
import { PolicyRow } from './components/existing-policies.component';
import { map } from 'rxjs/operators';

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
        <vallum-existing-policies [rows]="[]"></vallum-existing-policies>
      </mat-card>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDocumentsComponent implements OnInit {
  public rows$: Observable<PolicyRow[]>;

  constructor(private documentHandler: DocumentHandler) {}

  public ngOnInit() {
    this.rows$ = this.documentHandler.getDocuments().pipe(
      map(documents =>
        documents.map(doc => ({
          name: doc.name,
          id: doc.id,
        })),
      ),
    );
  }

  public upload(file: File): void {
    this.documentHandler.upload(file);
  }
}
