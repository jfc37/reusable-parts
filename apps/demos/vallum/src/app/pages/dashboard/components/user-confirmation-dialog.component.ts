import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSearchService, User } from '../services/user-search.service';
import { UserRow } from './user-table.component';

@Component({
  selector: 'vallum-user-confirmation-dialog',
  template: `
    <stateless-loader *ngIf="loading; else contentTemplate"></stateless-loader>

    <ng-template #contentTemplate>
      <p>
        <b>{{ data.row.name }}</b>
      </p>
      <p>{{ data.row.company }}</p>
      <p>{{ data.row.address }}</p>
      <button mat-raised-button data-test-id="cancel-button" (click)="cancel()">Cancel</button>
      <button mat-raised-button data-test-id="confirm-button" (click)="confirm()" color="accent" style="float: right;">
        Confirm
      </button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserConfirmationDialogComponent {
  public loading = false;

  constructor(
    private userSearch: UserSearchService,
    private dialogRef: MatDialogRef<UserConfirmationDialogComponent>,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; row: UserRow },
  ) {}

  public confirm(): void {
    this.loading = true;

    this.userSearch.update(this.data.user).subscribe({
      error: () => {
        this.snackBar.open('Problem updating details', 'Ok');
        this.loading = false;
        this.cd.markForCheck();
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
