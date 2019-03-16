import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SidebarModule, MenuItemType } from '@reusable-parts/stateless/components/sidebar';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SidebarComponent } from '@reusable-parts/stateless/components/sidebar';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { getThemeKnob, getExampleMenuItems } from '../knobs';

storiesOf('Components/Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: SidebarComponent }]),
        ThemeModule,
        SidebarModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const theme = getThemeKnob();
    const name = text('name', 'Full Swing');
    const folded = boolean('folded', false);
    const logoUrl = text('logoUrl', 'http://angular-material.fusetheme.com/assets/images/logos/fuse.svg');
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
        <stateless-sidebar
          [name]="name"
          [folded]="folded"
          [menuItems]="menuItems"
          [logoUrl]="logoUrl"
          (toggleFolded)="toggleFolded($event)">
        </stateless-sidebar>
      </ng-template>
      `,
      props: {
        theme,
        name,
        folded,
        logoUrl,
        menuItems,
        toggleFolded: action('toggleFolded'),
      },
    };
  })
  .add('with collapsable menu items', () => {
    const theme = getThemeKnob();
    const folded = boolean('folded', false);
    const menuItems = [
      {
        id: 'favourites',
        title: 'Favourites',
        icon: 'favorite',
        type: MenuItemType.Collapse,
        children: [
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
        ],
      },
      {
        id: 'categories',
        title: 'Categories',
        icon: 'category',
        type: MenuItemType.Collapse,
        children: [
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
        ],
      },
    ];

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-sidebar
          name="Uphill Ltd"
          [folded]="folded"
          [menuItems]="menuItems">
        </stateless-sidebar>
      </ng-template>
      `,
      props: {
        menuItems,
        theme,
        folded,
      },
    };
  })
  .add('with grouped menu items', () => {
    const theme = getThemeKnob();
    const folded = boolean('folded', false);
    const menuItems = getExampleMenuItems();

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-sidebar
          name="Uphill Ltd"
          [folded]="folded"
          [menuItems]="menuItems">
        </stateless-sidebar>
      </ng-template>`,
      props: {
        menuItems,
        theme,
        folded,
      },
    };
  })
  .add('with lots of menu items', () => {
    const theme = getThemeKnob();
    const folded = boolean('folded', false);
    const item = {
      id: 'books',
      title: 'Books',
      icon: 'book',
      type: MenuItemType.Item,
      url: 'category/books',
    };
    const menuItems = [
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
    ];

    return {
      template: `
      <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
      <ng-template #mainContentTemplate>
        <stateless-sidebar
          name="Uphill Ltd"
          [folded]="folded"
          [menuItems]="menuItems">
        </stateless-sidebar>
      </ng-template>`,
      props: {
        menuItems,
        theme,
        folded,
      },
    };
  });
