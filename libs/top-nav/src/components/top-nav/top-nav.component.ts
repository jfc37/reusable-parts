import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUser, LoggingOut } from '@reusable-parts/top-nav/src/+state/top-nav.actions';
import { TopNavState } from '@reusable-parts/top-nav/src/+state/top-nav.reducer';
import { avatarUrlSelector, displayNameSelector, hasLoggedOutSelector, isLoadingSelector } from '@reusable-parts/top-nav/src/+state/top-nav.selectors';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'jfc-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  @Input() redirectRouteAfterLogout: string

  public showLoadingBar$: Observable<boolean>;
  public hasNavigation$: Observable<boolean>;
  public loadingUser$: Observable<boolean>;
  public displayName$: Observable<string>;
  public avatarUrl$: Observable<string>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    private router: Router,
    private store: Store<TopNavState>,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new GetUser());

    this.loadingUser$ = this.store.select(isLoadingSelector);
    this.displayName$ = this.store.select(displayNameSelector);
    this.avatarUrl$ = this.store.select(avatarUrlSelector);

    this.store.select(hasLoggedOutSelector).pipe(
      takeUntil(this.onDestroy$),
      filter(Boolean),
      tap(() => this.router.navigate([this.redirectRouteAfterLogout])),
    ).subscribe();

    this.showLoadingBar$ = this.router.events.pipe(
      map(event => {
        if (event instanceof NavigationStart) {
          return true;
        }
        if (event instanceof NavigationEnd) {
          return false;
        }
      }),
      filter(emit => emit != null),
    );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public openSideNav(): void {
    console.error('open side nav');
  }

  public logout(): void {
    this.store.dispatch(new LoggingOut());
  }

}
