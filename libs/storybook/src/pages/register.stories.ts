import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { RegisterModule, RegisterComponent } from '@reusable-parts/stateless/pages/register';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { getThemeKnob } from '../knobs';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

storiesOf('Pages/Register', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: RegisterComponent }]),
        ThemeModule,
        RegisterModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const theme = getThemeKnob();
    const logoUrl = text('logoUrl', 'assets/images/logos/fuse.svg');
    const loginUrl = text('loginUrl', '/register');
    const forgotPasswordUrl = text('forgotPasswordUrl', '/reset-password');
    const titleText = text('titleText', 'Welcome to the FUSE!');
    const descriptionText = text(
      'descriptionText',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis viverra.',
    );
    const disabled = boolean('disabled', false);
    const errorMessage = text('errorMessage', '');
    const termsUrl = text('termsUrl', '');
    const captureName = boolean('captureName', false);

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-register-page
          [logoUrl]="logoUrl"
          [titleTemplate]="titleTemplate"
          [descriptionTemplate]="descriptionTemplate"
          [loginUrl]="loginUrl"
          [disabled]="disabled"
          [errorMessage]="errorMessage"
          [termsUrl]="termsUrl"
          [captureName]="captureName"
          (registerClicked)="registerClicked($event)"
        ></stateless-register-page>
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
        forgotPasswordUrl,
        disabled,
        errorMessage,
        termsUrl,
        captureName,
        registerClicked: action('registerClicked'),
      },
    };
  });
