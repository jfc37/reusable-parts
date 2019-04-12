import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'stateless-page',
  template: `
    <div class="page-layout simple fullwidth">
      <stateless-header *ngIf="headerType === 'standard'" [contentTemplate]="headerTemplate"></stateless-header>
      <stateless-hero-text
        *ngIf="headerType === 'hero'"
        [headerTemplate]="headerTemplate"
        [contentTemplate]="headerSubtextTemplate"
      ></stateless-hero-text>

      <div class="content p-24">
        <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
      </div>
    </div>

    <ng-template #defaultContent></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public headerSubtextTemplate: TemplateRef<any>;
  @Input() public contentTemplate: TemplateRef<any>;

  @Input() public headerType = HeaderType.Standard;
}

export enum HeaderType {
  Standard = 'standard',
  Hero = 'hero',
}
