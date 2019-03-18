import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'stateless-hero-text',
  template: `
    <div class="header" fxLayout="row" fxLayoutAlign="start stretch">
      <div class="hero-text" fxLayout="column" fxLayoutAlign="center center" fxFlex>
        <div class="h1">
          <ng-container *ngTemplateOutlet="headerTemplate ? headerTemplate : defaultContent"> </ng-container>
        </div>

        <div class="h3">
          <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
        </div>
      </div>
    </div>
    <ng-template #defaultContent></ng-template>
  `,
  styleUrls: ['./hero-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTextComponent {
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public contentTemplate: TemplateRef<any>;
}
