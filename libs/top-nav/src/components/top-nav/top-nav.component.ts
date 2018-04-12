import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jfc-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  @Output() public openSideNav = new EventEmitter();
  public showLoadingBar: boolean;
  public hasNavigation: boolean;

  private onDestroy$ = new ReplaySubject();

  constructor(
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.showLoadingBar = true;
        }
        if (event instanceof NavigationEnd) {
          this.showLoadingBar = false;
        }
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public openSideNavClicked(): void {
    this.openSideNav.emit();
  }
}
