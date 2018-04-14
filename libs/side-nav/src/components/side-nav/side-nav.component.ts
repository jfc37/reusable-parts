import { Component, Input, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FuseConfigService } from '@reusable-parts/@fuse/services/config.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jfc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit, OnDestroy {
  public folded: boolean;
  public sideBarClasses: any;

  private onDestroy$ = new ReplaySubject();

  constructor(private fuseConfig: FuseConfigService) { }

  public ngOnInit(): void {
    this.fuseConfig.onConfigChanged
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(newSettings => {
        this.folded = newSettings.layout.navigationFolded;
        this.sideBarClasses = newSettings.colorClasses.navbar;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
