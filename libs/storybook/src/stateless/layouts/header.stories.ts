import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { HeaderModule } from '@reusable-parts/stateless/layouts/header';
import { getThemeKnob } from '../../knobs';

storiesOf('Header', module)
  .addDecorator(
    moduleMetadata({
      imports: [ThemeModule, HeaderModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('with themes', () => {
    const theme = getThemeKnob();

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-header>Good morning, sir</stateless-header>
      </ng-template>`,
      props: {
        theme,
      },
    };
  });
