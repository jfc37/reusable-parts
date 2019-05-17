import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  HostBinding,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem, SidebarComponent } from '@reusable-parts/stateless/components/sidebar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
          [showHamburger]="sidebarHidden$ | async"
          [showLoadingBar]="userToolbar.showLoadingBar"
          [loadingProfile]="userToolbar.loadingProfile"
          [displayName]="userToolbar.displayName"
          [avatarUrl]="userToolbar.avatarUrl"
          (logoutClicked)="logoutClicked.emit()"
          (hamburgerClicked)="temporaryOpenSidebar()"
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
        overflow-y: auto;
      }
    `,
  ],
})
export class PageWithNavComponent implements OnInit {
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public sidebar: Partial<SidebarModel> = {};
  @Input() public userToolbar: UserToolbarModel;

  @Output() public logoutClicked = new EventEmitter<void>();

  @HostBinding('class.folded-sidebar') public hideSidebar = false;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;
  public sidebarHidden$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this.sidebarHidden$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(map(result => result.matches));
  }

  public toggleSidebar(): void {
    this.hideSidebar = !this.hideSidebar;
  }

  public temporaryOpenSidebar(): void {
    this.sidebarComponent.toggleOpen();
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
