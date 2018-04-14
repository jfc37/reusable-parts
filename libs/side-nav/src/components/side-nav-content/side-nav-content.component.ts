import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuseNavigationService } from '@reusable-parts/@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@reusable-parts/@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@reusable-parts/@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'jfc-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent implements OnInit, OnDestroy {
  private fusePerfectScrollbar: FusePerfectScrollbarDirective;

  @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this.fusePerfectScrollbar = theDirective;

    this.navigationServiceWatcher =
      this.navigationService.onItemCollapseToggled.subscribe(() => {
        this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
          this.fusePerfectScrollbar.update();
        }, 310);
      });
  }

  @Input() layout;
  navigation: any;
  navigationServiceWatcher: Subscription;
  fusePerfectScrollbarUpdateTimeout;

  constructor(
    private sidebarService: FuseSidebarService,
    private navigationService: FuseNavigationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (this.sidebarService.getSidebar('navbar')) {
            this.sidebarService.getSidebar('navbar').close();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.fusePerfectScrollbarUpdateTimeout) {
      clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
    }

    if (this.navigationServiceWatcher) {
      this.navigationServiceWatcher.unsubscribe();
    }
  }

  toggleSidebarOpened() {
    this.sidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded() {
    this.sidebarService.getSidebar('navbar').toggleFold();
  }
}
