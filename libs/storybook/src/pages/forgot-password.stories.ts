import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ForgotPasswordModule, ForgotPasswordComponent } from '@reusable-parts/stateless/pages/forgot-password';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { getThemeKnob } from '../knobs';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

storiesOf('Pages/Forgot Password', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: ForgotPasswordComponent }]),
        ThemeModule,
        ForgotPasswordModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const theme = getThemeKnob();
    const logoUrl = text('logoUrl', 'assets/images/logos/fuse.svg');
    const loginUrl = text('loginUrl', '/login');
    const titleText = text('titleText', 'Welcome to the FUSE!');
    const descriptionText = text(
      'descriptionText',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis viverra.',
    );
    const disabled = boolean('disabled', false);
    const errorMessage = text('errorMessage', '');

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-forgot-password-page
          [logoUrl]="logoUrl"
          [titleTemplate]="titleTemplate"
          [descriptionTemplate]="descriptionTemplate"
          [loginUrl]="loginUrl"
          [disabled]="disabled"
          [errorMessage]="errorMessage"
          (resetClicked)="resetClicked($event)"
        ></stateless-forgot-password-page>
      </ng-template>
      <ng-template #titleTemplate>
        {{titleText}}
      </ng-template>
      <ng-template #descriptionTemplate>
        {{descriptionText}}
      </ng-template>
      `,
      props: {
        theme,
        titleText,
        descriptionText,
        logoUrl,
        loginUrl,
        disabled,
        errorMessage,
        resetClicked: action('resetClicked'),
      },
    };
  });
