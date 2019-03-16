import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { HeaderModule } from '@reusable-parts/stateless/layouts/header';
import { getThemeKnob } from '../../../../../knobs';

storiesOf('Layouts/Header', module)
  .addDecorator(
    moduleMetadata({
      imports: [ThemeModule, HeaderModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('with themes', () => {
    const theme = getThemeKnob();
    const headerText = text('headerText', 'Good morning, sir');

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-header [contentTemplate]="headerTemplate"></stateless-header>
      </ng-template>
      <ng-template #headerTemplate>
        {{headerText}}
      </ng-template>
      `,
      props: {
        theme,
        headerText,
      },
    };
  });
