import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { action } from '@storybook/addon-actions';
import {
  PageWithNavModule,
  PageWithNavComponent,
  SidebarModel,
  UserToolbarModel,
} from '@reusable-parts/stateless/layouts/page-with-nav';
import { getThemeKnob, getExampleMenuItems } from '../../../../../knobs';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseModule } from '@reusable-parts/fuse';
import { HeaderType } from '@reusable-parts/stateless/layouts/page';

storiesOf('Layouts/Page With Navigation', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: PageWithNavComponent }]),
        BrowserAnimationsModule,
        FuseModule.forRoot({ customScrollbars: true }),
        ThemeModule,
        PageWithNavModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('with user toolbar', () => {
    const theme = getThemeKnob();
    const contentText = text('contentText', 'Some content here...');
    const sidebarName = text('sidebarName', 'Full Swing');
    const sidebarLogoUrl = text('sidebarLogoUrl', 'http://angular-material.fusetheme.com/assets/images/logos/fuse.svg');

    const displayName = text('displayName', 'Thomas Brady');
    const avatarUrl = text('avatarUrl', 'https://avatars.dicebear.com/v2/avataaars/emma.svg');
    const loadingProfile = boolean('loadingProfile', false);
    const showLoadingBar = boolean('showLoadingBar', false);

    const sidebarModel: Partial<SidebarModel> = {
      logoUrl: sidebarLogoUrl,
      name: sidebarName,
      menuItems: getExampleMenuItems(),
    };

    const userToolbarModel: Partial<UserToolbarModel> = {
      avatarUrl: avatarUrl,
      displayName: displayName,
      loadingProfile: loadingProfile,
      showLoadingBar: showLoadingBar,
    };

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-page-with-nav
          [userToolbar]="userToolbarModel"
          [sidebar]="sidebarModel"
          [contentTemplate]="contentTemplate"
          (logoutClicked)="logoutClicked($event)"
          ></stateless-page-with-nav>
      </ng-template>
      <ng-template #contentTemplate>
        {{contentText}}
      </ng-template>
      `,
      props: {
        theme,
        contentText,
        sidebarName,
        sidebarLogoUrl,
        sidebarModel,
        userToolbarModel,
        logoutClicked: action('logoutClicked'),
      },
    };
  })
  .add('without user toolbar', () => {
    const theme = getThemeKnob();
    const contentText = text('contentText', 'Some content here...');
    const sidebarName = text('sidebarName', 'Full Swing');
    const sidebarLogoUrl = text('sidebarLogoUrl', 'http://angular-material.fusetheme.com/assets/images/logos/fuse.svg');

    const sidebarModel: Partial<SidebarModel> = {
      logoUrl: sidebarLogoUrl,
      name: sidebarName,
      menuItems: getExampleMenuItems(),
    };

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-page-with-nav [sidebar]="sidebarModel" [contentTemplate]="contentTemplate"></stateless-page-with-nav>
      </ng-template>
      <ng-template #contentTemplate>
        {{contentText}}
      </ng-template>
      `,
      props: {
        theme,
        contentText,
        sidebarName,
        sidebarLogoUrl,
        sidebarModel,
      },
    };
  });
