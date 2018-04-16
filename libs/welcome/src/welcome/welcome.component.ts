import { Component, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';

@Component({
  selector: 'jfc-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: fuseAnimations,
})
export class WelcomeComponent {
  /**
   * Name of the application being welcomed to
   */
  @Input() public name: string;

  /**
   * Description of the application
   */
  @Input() public description: string;

  /**
   * Logo url
   */
  @Input() public logoUrl: string;
}
