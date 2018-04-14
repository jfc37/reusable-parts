import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { FuseConfigService } from '@reusable-parts/@fuse/services/config.service';

@Component({
  selector: 'jfc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SideNavComponent implements OnInit
{
  fuseSettings: any;
  constructor(
    private fuseConfig: FuseConfigService,
  ) {}

  public ngOnInit(): void {
    this.fuseConfig.onConfigChanged
        .subscribe(
            (newSettings) => {
              console.error('xxx', newSettings);
                this.fuseSettings = newSettings;
            }
        );
  }
}
