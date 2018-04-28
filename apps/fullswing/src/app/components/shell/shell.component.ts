import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FirebaseAuthService } from '@reusable-parts/guards';
import { FullSwingRoleTypes } from '../../authorisation/roles';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'jfc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public appName = `Full Swing`;
  public logoUrl = 'assets/fullswing.png';
  public menuItems$: Observable<MenuItem[]>;
  private adminSideNav: MenuItem[] = [
    {
      id: 'admin',
      title: 'Admin',
      type: MenuItemType.Collapse,
      children: [
        {
          id: 'teachers',
          title: 'Teachers',
          type: MenuItemType.Item,
          url: 'admin/teachers',
        },
      ],
    },
  ];

  private studentSideNav: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: MenuItemType.Item,
      url: 'dashboard',
    },
  ];

  constructor(public authService: FirebaseAuthService) {}

  public ngOnInit(): void {
    this.menuItems$ = this.authService
      .hasRole(FullSwingRoleTypes.Admin)
      .pipe(
        map(
          isAdmin =>
            isAdmin
              ? [...this.studentSideNav, ...this.adminSideNav]
              : this.studentSideNav
        )
      );
  }
}
