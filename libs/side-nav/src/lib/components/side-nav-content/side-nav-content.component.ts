import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuseNavigationService } from '@reusable-parts/@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@reusable-parts/@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@reusable-parts/@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jfc-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent implements OnInit, OnDestroy {
  @Input()
  menuItems: any[];
  @Input()
  name: string;
  @Input()
  logoUrl: string;

  private fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private onDestroy$ = new ReplaySubject();

  @ViewChild(FusePerfectScrollbarDirective)
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this.fusePerfectScrollbar = theDirective;

    this.navigationService.onItemCollapseToggled.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
        this.fusePerfectScrollbar.update();
      }, 310);
    });
  }
  private fusePerfectScrollbarUpdateTimeout;

  constructor(
    private sidebarService: FuseSidebarService,
    private navigationService: FuseNavigationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.sidebarService.getSidebar('navbar')) {
          this.sidebarService.getSidebar('navbar').close();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.fusePerfectScrollbarUpdateTimeout) {
      clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
    }

    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  toggleSidebarOpened() {
    this.sidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded() {
    this.sidebarService.getSidebar('navbar').toggleFold();
  }
}
