import { Component, Input } from '@angular/core';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';

@Component({
  selector: 'jfc-simple-layout',
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss'],
  animations: fuseAnimations,
})
export class SimpleLayoutComponent {
  @Input() public logoUrl;
}
