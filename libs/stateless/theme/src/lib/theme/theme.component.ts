import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'theme',
  template: `
    <div [ngClass]="'theme-' + theme" class="theme-light theme-container">
      <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
    </div>
    <ng-template #defaultContent></ng-template>
  `,
  styleUrls: ['./scss/styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnChanges {
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public theme: Theme = Theme.BlueLight;

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.theme) {
      this.theme = Theme.BlueLight;
    }
  }
}

export enum Theme {
  BlueLight = 'blue-light',
  YellowLight = 'yellow-light',
  BlueGreyDark = 'blue-gray-dark',
  PinkDark = 'pink-dark',
}
