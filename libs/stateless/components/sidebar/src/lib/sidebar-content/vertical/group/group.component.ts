import { Component, HostBinding, Input } from '@angular/core';
import { MenuItem } from '../../../sidebar/sidebar.component.model';

@Component({
  selector: 'stateless-nav-vertical-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class NavVerticalGroupComponent {
  @HostBinding('class')
  classes = 'nav-group nav-item';

  @Input()
  item: MenuItem;
}
