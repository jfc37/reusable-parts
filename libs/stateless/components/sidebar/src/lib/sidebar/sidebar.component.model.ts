export interface MenuItem {
  id: string;
  title: string;

  type: MenuItemType;

  /**
   * Function executed on click
   */
  function?: () => {};

  /**
   * Sets menu item to active only if url matches exactly
   */
  exactMatch?: boolean;
  icon?: string;
  children?: MenuItem[];
  url?: string;
  badge?: MenuItemBadge;
  hidden?: boolean;
  openInNewTab?: boolean;
  externalUrl?: string;
  classes?: { [key: string]: string };
}

export enum MenuItemType {
  Group = 'group',
  Collapse = 'collapsable',
  Item = 'item',
}

export interface MenuItemBadge {
  title: string;
  backgroundColour: string;
  textColour: string;
}
