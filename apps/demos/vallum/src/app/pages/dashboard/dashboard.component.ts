import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UserRow } from './components/user-table.component';
import { FormControl } from '@angular/forms';
import { switchMap, map, debounceTime, take, shareReplay, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserSearchService, User } from './services/user-search.service';
import { MatDialog } from '@angular/material';
import { UserConfirmationDialogComponent } from './components/user-confirmation-dialog.component';

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
    this.users$
      .pipe(
        take(1),
        map(users => users.find(user => user.id === row.id)),
      )
      .subscribe(user => {
        this.dialog.open(UserConfirmationDialogComponent, {
          data: { user, row },
        });
      });
  }
}
