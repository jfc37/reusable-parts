import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { getThemeKnob } from '../../../../../knobs';
import { HeaderType } from './page.component';

storiesOf('Layouts/Page', module)
  .addDecorator(
    moduleMetadata({
      imports: [ThemeModule, PageModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('with themes', () => {
    const theme = getThemeKnob();
    const headerType = select(
      'headerType',
      {
        [HeaderType.Standard]: HeaderType.Standard,
        [HeaderType.Hero]: HeaderType.Hero,
      },
      HeaderType.Hero,
    );
    const headerText = text('headerText', 'Good morning, sir');
    const contentText = text('contentText', 'Some content here...');

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-page [headerType]="headerType" [headerTemplate]="headerTemplate" [contentTemplate]="contentTemplate"></stateless-page>
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
        headerType,
        headerText,
        contentText,
      },
    };
  });
