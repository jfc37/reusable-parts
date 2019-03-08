import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessAlertComponent, AlertType } from '@reusable-parts/stateless/alert';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Component } from '@angular/core';

storiesOf('Stateless Alert', module)
  .addDecorator(
    moduleMetadata({
      imports: [CommonModule, MatIconModule, FlexLayoutModule],
      declarations: [StatelessAlertComponent],
    }),
  )
  .add('Default', () => ({
    component: StatelessAlertComponent,
  }))
  .add('with short content', () => ({
    component: ShortContentDemoComponent,
  }))
  .add('with multiple lined content', () => ({
    component: MultiLinedContentDemoComponent,
  }))
  .add('with success type', () => ({
    component: StatelessAlertComponent,
    props: {
      type: AlertType.Success,
    },
  }))
  .add('with error type', () => ({
    component: StatelessAlertComponent,
    props: {
      type: AlertType.Error,
    },
  }))
  .add('with warning type', () => ({
    component: StatelessAlertComponent,
    props: {
      type: AlertType.Warning,
    },
  }))
  .add('with info type', () => ({
    component: StatelessAlertComponent,
    props: {
      type: AlertType.Info,
    },
  }));

@Component({
  selector: 'demo',
  template: `
    <stateless-alert type="error" [contentTemplate]="alertContentTemplate"></stateless-alert>
    <ng-template #alertContentTemplate>Some custom content...</ng-template>
  `,
})
class ShortContentDemoComponent {}

@Component({
  selector: 'demo',
  template: `
    <stateless-alert type="error" [contentTemplate]="alertContentTemplate"></stateless-alert>
    <ng-template #alertContentTemplate>
      <div>
        Some custom content...
      </div>
      <div>
        If you want to see some more....
      </div>
      <div>
        Why don't you come back tomorrow?
      </div>
    </ng-template>
  `,
})
class MultiLinedContentDemoComponent {}
