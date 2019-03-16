import { Component, HostBinding, Input } from '@angular/core';
import { MenuItem } from '../../../sidebar/sidebar.component.model';

@Component({
  selector: 'stateless-nav-vertical-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class NavVerticalItemComponent {
  @HostBinding('class')
  classes = 'nav-item';

  @Input()
  item: MenuItem;
}
