import { Component, Input, OnDestroy, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FuseNavigationService } from '@reusable-parts/fuse/src/lib/@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@reusable-parts/fuse/src/lib/@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@reusable-parts/fuse';
import { MenuItem } from './sidebar.component.model';

@Component({
  selector: 'stateless-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: fuseAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnDestroy {
  @Input() name: string;
  @Input() logoUrl: string;
  @Input() menuItems: MenuItem[];
  @Input() folded: boolean;

  @Output() toggleFolded = new EventEmitter<void>();

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

  constructor(private navigationService: FuseNavigationService) {}

  ngOnDestroy() {
    if (this.fusePerfectScrollbarUpdateTimeout) {
      clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
    }

    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
