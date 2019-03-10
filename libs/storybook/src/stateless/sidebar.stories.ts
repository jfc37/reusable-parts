import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SidebarModule, MenuItemType } from '@reusable-parts/stateless/sidebar';
import { APP_BASE_HREF } from '@angular/common';
import { FuseModule } from '@reusable-parts/fuse';
import { RouterModule } from '@angular/router';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SidebarComponent } from '@reusable-parts/stateless/sidebar';

storiesOf('Stateless Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: SidebarComponent }]),
        SidebarModule,
        FuseModule.forRoot({}),
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
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
      <stateless-sidebar
        [name]="name"
        [folded]="folded"
        [menuItems]="menuItems"
        [logoUrl]="logoUrl"
        (toggleFolded)="toggleFolded($event)">
      </stateless-sidebar>`,
      props: {
        name,
        folded,
        logoUrl,
        menuItems,
        toggleFolded: action('toggleFolded'),
      },
    };
  })
  .add('with collapsable menu items', () => {
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
      <stateless-sidebar
        name="Uphill Ltd"
        [menuItems]="menuItems">
      </stateless-sidebar>`,
      props: {
        menuItems,
      },
    };
  })
  .add('with grouped menu items', () => {
    const menuItems = [
      {
        id: 'group-a',
        title: 'Group A',
        type: MenuItemType.Group,
        children: [
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
        ],
      },
      {
        id: 'group-b',
        title: 'Group B',
        type: MenuItemType.Group,
        children: [
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
        ],
      },
    ];

    return {
      template: `
      <stateless-sidebar
        name="Uphill Ltd"
        [menuItems]="menuItems">
      </stateless-sidebar>`,
      props: {
        menuItems,
      },
    };
  })
  .add('with lots of menu items', () => {
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
      <stateless-sidebar
        name="Uphill Ltd"
        [menuItems]="menuItems">
      </stateless-sidebar>`,
      props: {
        menuItems,
      },
    };
  });
