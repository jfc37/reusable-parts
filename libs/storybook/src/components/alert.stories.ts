import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessAlertModule, AlertType } from '@reusable-parts/stateless/alert';
import { withKnobs, text, select } from '@storybook/addon-knobs';

storiesOf('Components/Alert', module)
  .addDecorator(
    moduleMetadata({
      imports: [StatelessAlertModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const type = select('type', {
      [AlertType.Success]: AlertType.Success,
      [AlertType.Error]: AlertType.Error,
      [AlertType.Warning]: AlertType.Warning,
      [AlertType.Info]: AlertType.Info,
    });
    const message = text('message', 'Some very important information here...');
    return {
      template: `
      <stateless-alert
        [type]="type"
        [contentTemplate]="alertContentTemplate">
      </stateless-alert>
      <ng-template #alertContentTemplate>{{message}}</ng-template>`,
      props: {
        type,
        message,
      },
    };
  })
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
  }));
