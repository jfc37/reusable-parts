import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { UserRow } from './components/user-table.component';
import { FormControl } from '@angular/forms';
import { tap, takeUntil, switchMap, map } from 'rxjs/operators';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { UserSearchService, User } from './services/user-search.service';

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

        <vallum-user-table [rows]="tableRows$ | async"></vallum-user-table>
      </mat-card>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl('');
  public tableRows$: Observable<UserRow[]>;
  public users$: Observable<User[]>;

  private _destroy$ = new ReplaySubject<void>();
  constructor(private userSearch: UserSearchService) {}
  public ngOnInit(): void {
    this.users$ = this.searchControl.valueChanges.pipe(
      takeUntil(this._destroy$),
      switchMap(search => this.userSearch.search(search)),
    );

    this.tableRows$ = this.users$.pipe(
      map(users =>
        users.map(
          user =>
            ({
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

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
