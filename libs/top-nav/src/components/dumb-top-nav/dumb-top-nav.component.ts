import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jfc-dumb-top-nav',
  templateUrl: './dumb-top-nav.component.html',
  styleUrls: ['./dumb-top-nav.component.scss']
})
export class DumbTopNavComponent {
  @Input() public showHamburger: boolean;
  @Input() public showLoadingBar: boolean;
  @Input() public loadingProfile: boolean;
  @Input() public displayName: string;
  @Input() public avatarUrl: string;

  @Output() hamburgerClicked = new EventEmitter();
  @Output() logoutClicked = new EventEmitter();
}
