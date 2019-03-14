import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SidebarModule, MenuItemType } from '@reusable-parts/stateless/sidebar';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { withKnobs, select } from '@storybook/addon-knobs';
import { SidebarComponent } from '@reusable-parts/stateless/sidebar';
import { ThemeModule, Theme } from '@reusable-parts/stateless/theme';
import { LoaderModule } from '@reusable-parts/stateless/loader';

storiesOf('Theme', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: SidebarComponent }]),
        ThemeModule,
        SidebarModule,
        LoaderModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('with Knobs', () => {
    const type = select('type', {
      [Theme.BlueLight]: Theme.BlueLight,
      [Theme.YellowLight]: Theme.YellowLight,
      [Theme.BlueGreyDark]: Theme.BlueGreyDark,
      [Theme.PinkDark]: Theme.PinkDark,
    });
    const menuItems = [
      {
        id: 'books',
        title: 'Books',
        icon: 'book',
        type: MenuItemType.Item,
        url: 'category/books',
      },
      {
        id: 'videos',
        title: 'Videos',
        icon: 'ondemand_video',
        type: MenuItemType.Item,
        url: 'category/videos',
      },
      {
        id: 'papers',
        title: 'Paper',
        icon: 'library_books',
        type: MenuItemType.Item,
        url: 'category/paper',
      },
    ];

    return {
      template: `
      <theme [theme]="type" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
      <!--<stateless-sidebar
        name="Uphill Ltd"
        [menuItems]="menuItems">
      </stateless-sidebar>-->
      <stateless-loader></stateless-loader>
      </ng-template>`,
      props: {
        type,
        menuItems,
      },
    };
  });