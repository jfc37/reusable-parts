import { Component, Input, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'theme',
  template: `
    <div [ngClass]="'theme-' + theme">
      <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
    </div>
    <ng-template #defaultContent></ng-template>
  `,
  styleUrls: ['./scss/styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent {
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public theme: Theme;
}

export enum Theme {
  BlueLight = 'blue-light',
  YellowLight = 'yellow-light',
  BlueGreyDark = 'blue-gray-dark',
  PinkDark = 'pink-dark',
}
