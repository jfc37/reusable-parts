import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'stateless-hero-text',
  template: `
    <div class="header" fxLayout="row" fxLayoutAlign="start stretch">
      <div class="hero-text" fxLayout="column" fxLayoutAlign="center center" fxFlex>
        <div *ngIf="headerTemplate" class="h1">
          <ng-container *ngTemplateOutlet="headerTemplate"> </ng-container>
        </div>

        <div *ngIf="contentTemplate" class="h3">
          <ng-container *ngTemplateOutlet="contentTemplate"> </ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./hero-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTextComponent {
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public contentTemplate: TemplateRef<any>;
}
