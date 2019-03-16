import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SidebarModule, MenuItemType } from '@reusable-parts/stateless/components/sidebar';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { withKnobs } from '@storybook/addon-knobs';
import { SidebarComponent } from '@reusable-parts/stateless/components/sidebar';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { LoaderModule } from '@reusable-parts/stateless/components/loader';
import { getThemeKnob } from '../../../../../knobs';

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
    const theme = getThemeKnob();
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
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
      <!--<stateless-sidebar
        name="Uphill Ltd"
        [menuItems]="menuItems">
      </stateless-sidebar>-->
      <stateless-loader></stateless-loader>
      </ng-template>`,
      props: {
        theme,
        menuItems,
      },
    };
  });
