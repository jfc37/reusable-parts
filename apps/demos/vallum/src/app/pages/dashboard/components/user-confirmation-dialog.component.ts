import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserSearchService, User } from '../services/user-search.service';
import { UserRow } from './user-table.component';

@Component({
  selector: 'vallum-user-confirmation-dialog',
  template: `
    <stateless-loader *ngIf="loading; else contentTemplate"></stateless-loader>
    <ng-template #contentTemplate>
      <stateless-alert *ngIf="errorUpdating" type="error" [contentTemplate]="errorTemplate"> </stateless-alert>
      <p>
        <b>{{ data.row.name }}</b>
      </p>
      <p>{{ data.row.company }}</p>
      <p>{{ data.row.address }}</p>
      <button mat-raised-button (click)="cancel()">Cancel</button>
      <button mat-raised-button (click)="confirm()" color="accent" style="float: right;">Confirm</button>
    </ng-template>

    <ng-template #errorTemplate>Error updating details</ng-template>
  `,
})
export class UserConfirmationDialogComponent {
  public loading = false;
  public errorUpdating = false;

  constructor(
    private userSearch: UserSearchService,
    private dialogRef: MatDialogRef<UserConfirmationDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; row: UserRow },
  ) {}

  public confirm(): void {
    this.loading = true;

    this.userSearch.update(this.data.user).subscribe({
      error: () => {
        this.errorUpdating = true;
        this.loading = false;
      },
      complete: () => {
        this.dialogRef.close(true);
        this.snackBar.open('Updated your details', 'Ok');
      },
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
