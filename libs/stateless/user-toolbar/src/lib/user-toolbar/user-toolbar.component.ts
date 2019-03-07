import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stateless-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss'],
})
export class StatelessUserToolbarComponent {
  @Input()
  public showHamburger: boolean;
  @Input()
  public showLoadingBar: boolean;
  @Input()
  public loadingProfile: boolean;
  @Input()
  public displayName: string;
  @Input()
  public avatarUrl: string;

  @Output()
  hamburgerClicked = new EventEmitter();
  @Output()
  logoutClicked = new EventEmitter();
}
