import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'stateless-header',
  template: `
    <div class="header accent p-24" fxLayout="row" fxLayoutAlign="start center">
      <h2>
        <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
      </h2>
    </div>
    <ng-template #defaultContent></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public contentTemplate: TemplateRef<any>;
}
