import { Component } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';

@Component({
  selector: 'jfc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  public appName = `Sous Chef`;
  public logoUrl = 'assets/chef.png';
  public menuItems: MenuItem[] = [
    {
      id: 'meals',
      title: 'Meals',
      type: MenuItemType.Group,
      icon: 'apps',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: MenuItemType.Item,
          icon: 'apps',
          url: 'dashboard',
        },
        {
          id: 'profile',
          title: 'Profile',
          type: MenuItemType.Item,
          icon: 'apps',
          url: 'profile',
        },
      ]
    },
  ];
}
