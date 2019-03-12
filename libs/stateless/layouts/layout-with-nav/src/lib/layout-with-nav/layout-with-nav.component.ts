import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'layout-with-nav',
  templateUrl: './layout-with-nav.component.html',
})
export class LayoutWithNavComponent {
  @Input() public contentTemplate: TemplateRef<any>;
}
