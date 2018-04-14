import { Component, Input } from '@angular/core';
import { FuseConfigService } from '@reusable-parts/@fuse/services/config.service';

@Component({
  selector: 'jfc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent
{
  @Input() public folded = false;

  constructor(private fuseConfigService: FuseConfigService) {
    console.error('xxx', fuseConfigService);
  }
}
