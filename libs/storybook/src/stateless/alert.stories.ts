import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessAlertModule } from '@reusable-parts/stateless/alert';

storiesOf('Stateless Alert', module)
  .addDecorator(
    moduleMetadata({
      imports: [StatelessAlertModule],
    }),
  )
  .add('Default', () => ({
    template: `<stateless-alert></stateless-alert>`,
  }))
  .add('with short content', () => ({
    template: `
      <stateless-alert type="success" [contentTemplate]="alertContentTemplate"></stateless-alert>
      <ng-template #alertContentTemplate>You're all good to go!</ng-template>
    `,
  }))
  .add('with multiple lined content', () => ({
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
  }))
  .add('with success type', () => ({
    template: `<stateless-alert type="success"></stateless-alert>`,
  }))
  .add('with error type', () => ({
    template: `<stateless-alert type="error"></stateless-alert>`,
  }))
  .add('with warning type', () => ({
    template: `<stateless-alert type="warning"></stateless-alert>`,
  }))
  .add('with info type', () => ({
    template: `<stateless-alert type="info"></stateless-alert>`,
  }));
