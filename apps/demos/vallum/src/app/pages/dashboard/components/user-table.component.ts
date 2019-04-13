import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'vallum-user-table',
  template: `
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
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() rows: UserRow[];

  displayedColumns: string[] = ['name', 'company', 'address'];
}

export interface UserRow {
  name: string;
  company: string;
  address: string;
}
