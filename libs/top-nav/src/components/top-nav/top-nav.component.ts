import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'jfc-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  public showLoadingBar$: Observable<boolean>;
  public hasNavigation$ = Observable.of(true);
  public isLoggedIn$ = Observable.of(true);
  public displayName$ = Observable.of('Joe Chappy');
  public avatarUrl$ = Observable.of('assets/images/avatars/profile.jpg');

  private onDestroy$ = new ReplaySubject();

  constructor(
    private router: Router,
  ) { }

  public ngOnInit(): void {
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
