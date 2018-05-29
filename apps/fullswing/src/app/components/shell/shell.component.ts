import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav/src';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FirebaseAuthService } from '@reusable-parts/guards/src';
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
      icon: 'lock',
      type: MenuItemType.Collapse,
      children: [
        {
          id: 'teachers',
          title: 'Teachers',
          icon: 'people',
          type: MenuItemType.Item,
          url: 'admin/teachers',
        },
        {
          id: 'blocks',
          title: 'Blocks',
          icon: 'view_module',
          type: MenuItemType.Item,
          url: 'admin/blocks',
        },
      ],
    },
  ];

  private studentSideNav: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      type: MenuItemType.Item,
      url: 'dashboard',
    },
    {
      id: 'block-enrol',
      title: 'Block Enrol',
      icon: 'insert_invitation',
      type: MenuItemType.Item,
      url: 'enrol/blocks',
    },
  ];

  constructor(public authService: FirebaseAuthService) {}

  public ngOnInit(): void {
    this.menuItems$ = this.authService
      .hasRole(FullSwingRoleTypes.Admin)
      .pipe(map(isAdmin => (isAdmin ? [...this.studentSideNav, ...this.adminSideNav] : this.studentSideNav)));
  }
}
