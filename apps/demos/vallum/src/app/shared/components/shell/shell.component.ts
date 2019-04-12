import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarModel, UserToolbarModel } from '@reusable-parts/stateless/layouts/page-with-nav';
import { Auth0Service } from '@reusable-parts/logic/integration/auth0';
import { MenuItemType } from '@reusable-parts/stateless/components/sidebar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vallum-shell',
  template: `
    <stateless-page-with-nav
      [sidebar]="sidebar"
      [userToolbar]="userToolbar$ | async"
      [contentTemplate]="contentTemplate"
      (logoutClicked)="logout()"
    ></stateless-page-with-nav>
  `,
})
export class ShellComponent implements OnInit {
  @Input() public contentTemplate: TemplateRef<any>;

  public userToolbar$: Observable<UserToolbarModel>;
  public sidebar: SidebarModel;

  constructor(private auth: Auth0Service) {}

  public ngOnInit(): void {
    this.auth.handleAuthentication('/dashboard');

    this.userToolbar$ = this.auth.userProfile$.pipe(
      map(
        profile =>
          ({
            avatarUrl: profile.picture,
            displayName: profile.nickname || profile.name,
          } as UserToolbarModel),
      ),
    );

    this.sidebar = {
      name: 'Vallum',
      logoUrl: '/assets/vallum.png',
      menuItems: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          url: '/dashboard',
          icon: 'dashboard',
          type: MenuItemType.Item,
        },
      ],
    };
  }

  public logout(): void {
    this.auth.logout();
  }
}
