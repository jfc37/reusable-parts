import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InitialiseTopNav } from '@reusable-parts/top-nav/src/+state/top-nav.actions';
import { TopNavState } from '@reusable-parts/top-nav/src/+state/top-nav.reducer';
import { avatarUrlSelector, displayNameSelector, isLoggedInSelector } from '@reusable-parts/top-nav/src/+state/top-nav.selectors';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { filter, map, tap } from 'rxjs/operators';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/services/firebase-user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'jfc-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  public showLoadingBar$: Observable<boolean>;
  public hasNavigation$: Observable<boolean>;
  public isLoggedIn$: Observable<boolean>;
  public displayName$: Observable<string>;
  public avatarUrl$: Observable<string>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    private router: Router,
    private store: Store<TopNavState>,
    private af: AngularFireAuth,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new InitialiseTopNav());

    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
    this.displayName$ = this.store.select(displayNameSelector);
    this.avatarUrl$ = this.store.select(avatarUrlSelector);

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
    console.error('log out');
  }

}
