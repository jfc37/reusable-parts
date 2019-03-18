import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { getThemeKnob } from '../../../../../knobs';
import { HeroTextModule } from './hero-text.module';
import { FuseModule } from '@reusable-parts/fuse';

storiesOf('Components/Hero Text', module)
  .addDecorator(
    moduleMetadata({
      imports: [FuseModule.forRoot({ customScrollbars: true }), ThemeModule, HeroTextModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('with themes', () => {
    const theme = getThemeKnob();
    const headerText = text('headerText', 'Good morning, sir');
    const contentText = text('contentText', 'Do you want to party?');

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-hero-text [headerTemplate]="headerTemplate"
          [contentTemplate]="contentTemplate"
        ></stateless-hero-text>
      </ng-template>
      <ng-template #headerTemplate>
        {{headerText}}
      </ng-template>
      <ng-template #contentTemplate>
        {{contentText}}
      </ng-template>
      `,
      props: {
        theme,
        headerText,
        contentText,
      },
    };
  });
