import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'vallum-user-table',
  template: `
    <mat-progress-bar *ngIf="loading" mode="query" color="accent"></mat-progress-bar>
    <table mat-table [dataSource]="rows" class="mat-elevation-z8">
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <!-- Company Column -->
      <ng-container matColumnDef="company">
        <th mat-header-cell *matHeaderCellDef>Company</th>
        <td mat-cell *matCellDef="let element">{{ element.company }}</td>
      </ng-container>

      <!-- Address Column -->
      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef>Address</th>
        <td mat-cell *matCellDef="let element">{{ element.address }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: displayedColumns"
        class="summary-row"
        (click)="rowSelected.emit(row)"
      ></tr>
    </table>
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
      tr.summary-row:hover {
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserTableComponent {
  @Input() rows: UserRow[];
  @Input() loading: boolean;
  @Output() rowSelected = new EventEmitter<UserRow>();

  displayedColumns: string[] = ['name', 'company', 'address'];
  expandedRow: UserRow;
}

export interface UserRow {
  id: number;
  name: string;
  company: string;
  address: string;
}
