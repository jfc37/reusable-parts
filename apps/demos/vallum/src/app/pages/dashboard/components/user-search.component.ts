import { Component, ChangeDetectionStrategy, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, tap, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'vallum-user-search',
  template: `
    <form>
      <mat-form-field>
        <input
          data-test-id="user-search-input"
          [formControl]="searchControl"
          matInput
          placeholder="Search for yourself"
        />
      </mat-form-field>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent implements OnInit, OnDestroy {
  @Input() search: ReplaySubject<string>;
  public searchControl = new FormControl('');
  private _destroyed$ = new ReplaySubject<void>();

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        debounceTime(600),
        filter(value => value.length > 2),
        tap(value => this.search.next(value)),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }
}
