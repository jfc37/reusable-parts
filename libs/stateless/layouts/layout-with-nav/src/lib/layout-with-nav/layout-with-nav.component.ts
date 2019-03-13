import { Component, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'layout-with-nav',
  templateUrl: './layout-with-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutWithNavComponent {
  @Input() public contentTemplate: TemplateRef<any>;
}
