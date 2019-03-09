export interface MenuItem {
  id: string;
  title: string;

  /**
   * Key to look up in translation config
   */
  translateKey?: string;
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
}

export enum MenuItemType {
  Group = 'group',
  Collapse = 'collapsable',
  Item = 'item',
}

export interface MenuItemBadge {
  title: string;
  translateKey: string;
  backgroundColour: string;
  textColour: string;
}
