import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
  OnChanges,
} from '@angular/core';

// TODO: &&&&& change this to a directive, and apply classes to body element
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

  constructor(private renderer: Renderer2) {}

  public ngOnChanges(): void {
    this.renderer.addClass(document.body, `theme-${this.theme}`);
    this.renderer.addClass(document.body, `theme-light`);
    this.renderer.addClass(document.body, `theme-container`);
  }
}

export enum Theme {
  BlueLight = 'blue-light',
  YellowLight = 'yellow-light',
  BlueGreyDark = 'blue-gray-dark',
  PinkDark = 'pink-dark',
}
