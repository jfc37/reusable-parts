import { select } from '@storybook/addon-knobs';
import { Theme } from '@reusable-parts/stateless/theme';
import { MenuItemType, MenuItem } from '@reusable-parts/stateless/sidebar';

export function getThemeKnob() {
  return select(
    'type',
    {
      [Theme.BlueLight]: Theme.BlueLight,
      [Theme.YellowLight]: Theme.YellowLight,
      [Theme.BlueGreyDark]: Theme.BlueGreyDark,
      [Theme.PinkDark]: Theme.PinkDark,
    },
    Theme.BlueLight,
  );
}

export function getExampleMenuItems(): MenuItem[] {
  return [
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
}
