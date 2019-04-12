import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { MenuItem } from '@reusable-parts/stateless/components/sidebar';

@Component({
  selector: 'stateless-page-with-nav',
  template: `
    <div fxLayout="row" fxLayoutAlign="start stretch" style="height: 100%;">
      <stateless-sidebar
        [logoUrl]="sidebar.logoUrl"
        [menuItems]="sidebar.menuItems"
        [name]="sidebar.name"
        [folded]="hideSidebar"
        (toggleFolded)="toggleSidebar()"
      ></stateless-sidebar>
      <div class="container">
        <stateless-user-toolbar
          *ngIf="userToolbar"
          [showLoadingBar]="userToolbar.showLoadingBar"
          [loadingProfile]="userToolbar.loadingProfile"
          [displayName]="userToolbar.displayName"
          [avatarUrl]="userToolbar.avatarUrl"
          (logoutClicked)="logoutClicked.emit()"
        ></stateless-user-toolbar>
        <ng-container *ngTemplateOutlet="contentTemplate"> </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host.folded-sidebar .container {
        padding-left: 64px;
      }

      .container {
        width: 100%;
      }
    `,
  ],
})
export class PageWithNavComponent {
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public sidebar: Partial<SidebarModel> = {};
  @Input() public userToolbar: UserToolbarModel;

  @Output() public logoutClicked = new EventEmitter<void>();

  @HostBinding('class.folded-sidebar') public hideSidebar = false;

  public toggleSidebar(): void {
    this.hideSidebar = !this.hideSidebar;
  }
}

export class SidebarModel {
  name: string;
  logoUrl: string;
  menuItems: MenuItem[];
}

export class UserToolbarModel {
  showLoadingBar: boolean;
  loadingProfile: boolean;
  displayName: string;
  avatarUrl: string;
}
