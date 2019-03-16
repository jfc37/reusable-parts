import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
    const logoUrl = text('logoUrl', 'assets/images/logos/fuse.svg');
    const registerUrl = text('registerUrl', '/register');
    const forgotPasswordUrl = text('forgotPasswordUrl', '/reset-password');
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
        <stateless-login-page
          [logoUrl]="logoUrl"
          [registerUrl]="registerUrl"
          [forgotPasswordUrl]="forgotPasswordUrl"
          [titleTemplate]="titleTemplate"
          [descriptionTemplate]="descriptionTemplate"
          [disabled]="disabled"
          [errorMessage]="errorMessage"
          (loginClicked)="loginClicked($event)"
        ></stateless-login-page>
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
        registerUrl,
        forgotPasswordUrl,
        disabled,
        errorMessage,
        loginClicked: action('loginClicked'),
      },
    };
  });
