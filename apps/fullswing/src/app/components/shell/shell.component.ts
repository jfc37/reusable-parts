import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FirebaseAuthService } from '@reusable-parts/guards';
import { UserRoleTypes } from '../../authorisation/roles';
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

  constructor(public authService: FirebaseAuthService) {}

  public ngOnInit(): void {
    this.menuItems$ = this.authService
      .hasRole(UserRoleTypes.Admin)
      .pipe(
        tap(console.error.bind(null, '111')),
        map(isAdmin => (isAdmin ? this.adminSideNav : [])),
        tap(console.error.bind(null, '222'))
      );
  }
}
