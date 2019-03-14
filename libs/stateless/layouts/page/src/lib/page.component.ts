import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'stateless-page',
  template: `
    <div class="page-layout simple fullwidth">
      <stateless-header [contentTemplate]="headerTemplate"></stateless-header>

      <div class="content p-24">
        <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
      </div>
    </div>
    <ng-template #defaultContent>Hello</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public contentTemplate: TemplateRef<any>;
}
