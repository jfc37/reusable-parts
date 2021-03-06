import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vallum-existing-policies',
  template: `
    <h1>Existing policies</h1>
    <stateless-loader *ngIf="loading; else content"></stateless-loader>
    <ng-template #content>
      <p *ngIf="errorLoading; else viewPolicies">Oops, there was a problem loading your policies.</p>
    </ng-template>

    <ng-template #viewPolicies>
      <table *ngIf="hasPolicies(); else noPolicies" mat-table [dataSource]="rows" class="mat-elevation-z8">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let policy">
            <a href="javascript:void(0)" (click)="download.emit(policy.name)">{{ policy.name }}</a>
          </td>
        </ng-container>

        <!-- Uploaded Column -->
        <ng-container matColumnDef="uploaded">
          <th mat-header-cell *matHeaderCellDef>Uploaded</th>
          <td mat-cell *matCellDef="let policy">{{ policy.lastModified | date: 'medium' }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          data-test-id="user-search-row"
          mat-row
          *matRowDef="let row; columns: displayedColumns"
          class="summary-row"
        ></tr>
      </table>
    </ng-template>

    <ng-template #noPolicies>
      <p>
        You haven't uploaded any policies yet.
      </p>
    </ng-template>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
      tr.summary-row:hover {
        background: #f5f5f5;
      }
      tr.summary-row:active {
        background: #efefef;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingPoliciesComponent {
  @Input() rows: PolicyRow[] = [];
  @Input() loading: boolean;
  @Input() errorLoading: boolean;
  @Output() download = new EventEmitter<string>();

  public displayedColumns: string[] = ['name', 'uploaded'];

  public hasPolicies(): boolean {
    return this.rows && this.rows.length > 0;
  }
}

export interface PolicyRow {
  name: string;
  lastModified: string;
  size: number;
}
