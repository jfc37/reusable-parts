import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Auth0Service } from '@reusable-parts/logic/integration/auth0';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserToolbarModel, SidebarModel } from '@reusable-parts/stateless/layouts/page-with-nav';
import { MenuItemType } from '@reusable-parts/stateless/components/sidebar/src';

@Component({
  selector: 'vallum-dashboard',
  template: `
    <stateless-page-with-nav
      headerType="hero"
      [headerTemplate]="headerTemplate"
      [sidebar]="sidebar"
      [userToolbar]="userToolbar$ | async"
      [contentTemplate]="contentTemplate"
      (logoutClicked)="logout()"
    ></stateless-page-with-nav>
    <ng-template #headerTemplate>Dashboard</ng-template>
    <ng-template #contentTemplate>
      <form>
        <mat-form-field>
          <input matInput placeholder="Search for yourself" />
        </mat-form-field>
      </form>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
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
