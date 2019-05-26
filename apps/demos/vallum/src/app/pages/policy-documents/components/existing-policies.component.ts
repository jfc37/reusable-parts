import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vallum-existing-policies',
  template: `
    <h1>Existing policies</h1>
    <stateless-loader *ngIf="loading; else content"></stateless-loader>
    <ng-template #content>
      <p *ngIf="rows.length < 1">
        You haven't uploaded any policies yet.
      </p>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingPoliciesComponent {
  @Input() rows: PolicyRow[];
  @Input() loading: boolean;
  @Output() rowSelected = new EventEmitter<PolicyRow>();
}

export interface PolicyRow {
  id: string;
  name: string;
}
