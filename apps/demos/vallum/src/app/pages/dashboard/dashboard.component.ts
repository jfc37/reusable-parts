import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { UserRow } from './components/user-table.component';
import { FormControl } from '@angular/forms';
import { switchMap, map, debounceTime, take, shareReplay, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserSearchService, User } from './services/user-search.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'vallum-dashboard',
  template: `
    <vallum-shell [contentTemplate]="shellContent"></vallum-shell>

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
        Welcome to Vallum
      </div>
    </ng-template>

    <ng-template #headerSubtextTemplate>
      <div class="p-24">
        We can grab your details from the companies register
      </div>
    </ng-template>

    <ng-template #bodyTemplate>
      <mat-card>
        <form>
          <mat-form-field>
            <input [formControl]="searchControl" matInput placeholder="Search for yourself" />
          </mat-form-field>
        </form>

        <vallum-user-table
          [loading]="loading$ | async"
          [rows]="tableRows$ | async"
          (rowSelected)="userSelected($event)"
        ></vallum-user-table>
      </mat-card>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public searchControl = new FormControl('');
  public tableRows$: Observable<UserRow[]>;
  public users$: Observable<User[]>;
  public loading$ = new BehaviorSubject(false);

  constructor(private userSearch: UserSearchService, private dialog: MatDialog) {}
  public ngOnInit(): void {
    this.users$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      tap(() => this.loading$.next(true)),
      switchMap(search => this.userSearch.search(search)),
      tap(() => this.loading$.next(false)),
      shareReplay(1),
    );

    this.tableRows$ = this.users$.pipe(
      map(users =>
        users.map(
          user =>
            ({
              id: user.id,
              name: [user.firstName, user.middleName, user.lastName].join(' '),
              company: user.associatedCompany.name,
              address: [
                ...user.physicalAddress.addressLines,
                user.physicalAddress.postCode,
                user.physicalAddress.countryCode,
              ].join(' '),
            } as UserRow),
        ),
      ),
    );
  }

  public userSelected(row: UserRow): void {
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      // this.users$
      //   .pipe(
      //     take(1),
      //     map(users => users.find(user => user.id === row.id)),
      //     switchMap(user => this.userSearch.update(user)),
      //   )
      //   .subscribe();
    });
  }
}

@Component({
  selector: 'vallum-user-confirmation-dialog',
  template: `
    <h1>Hello</h1>
    <pre>{{ data | json }}</pre>
  `,
})
export class UserConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserRow,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
