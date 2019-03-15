import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StatelessLoginPageModule, LoginComponent } from '@reusable-parts/stateless/pages/login';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { getThemeKnob } from '../../knobs';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

storiesOf('Stateless Login Page', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: LoginComponent }]),
        ThemeModule,
        StatelessLoginPageModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const theme = getThemeKnob();
    const headerText = text('headerText', 'Good morning, sir');
    const contentText = text('contentText', 'Some content here...');

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-login-page></stateless-login-page>
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
