import { Component, Input, ViewEncapsulation, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FuseConfigService } from '@reusable-parts/fuse/src/lib/@fuse/services/config.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';
import { MenuItem } from '@reusable-parts/side-nav/src/lib/components/side-nav/side-nav.component.model';

@Component({
  selector: 'jfc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public menuItems: MenuItem[] = [];
  @Input()
  public name: string;
  @Input()
  public logoUrl: string;

  public folded: boolean;
  public sideBarClasses: any;
  public fuseMenuItems: any[];

  private onDestroy$ = new ReplaySubject();

  constructor(private fuseConfig: FuseConfigService) {}

  public ngOnInit(): void {
    this.fuseConfig.config.pipe(takeUntil(this.onDestroy$)).subscribe(newSettings => {
      this.folded = newSettings.layout.navigationFolded;
      this.sideBarClasses = newSettings.colorClasses.navbar;
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuItems']) {
      this.fuseMenuItems = this.menuItems && this.menuItems.map(menuItemToFuseMenuItem);
    }
  }
}

function menuItemToFuseMenuItem(item: MenuItem): any {
  return {
    ...item,
    translate: item.translateKey,
    badge: item.badge && {
      ...item.badge,
      translate: item.badge.translateKey,
      bg: item.badge.backgroundColour,
      fg: item.badge.textColour,
    },
    children: item.children && item.children.map(menuItemToFuseMenuItem),
  };
}
