import { storiesOf, moduleMetadata } from '@storybook/angular';
import { LoaderModule } from '@reusable-parts/stateless/loader';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { withKnobs } from '@storybook/addon-knobs';
import { getThemeKnob } from '../knobs';

storiesOf('Components/Loader', module)
  .addDecorator(
    moduleMetadata({
      imports: [ThemeModule, LoaderModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('with themes', () => {
    const theme = getThemeKnob();

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-loader></stateless-loader>
      </ng-template>`,
      props: {
        theme,
      },
    };
  });
