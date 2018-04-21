import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { MenuItemType } from "@reusable-parts/side-nav";

const selector = createFeatureSelector<AppState>('app');

export const allMealItemsSelector = createSelector(selector, state => state.mealItems);

export const cookingInstructionsSelector = createSelector(
  allMealItemsSelector,
  mealItems => ({
    id: 'cooking-instructions',
    title: 'Cooking instructions',
    type: MenuItemType.Collapse,
    icon: 'restaurant_menu',
    children: mealItems.map(item => ({
      id: 'instructions-' + item.slug,
      title: item.name,
      type: MenuItemType.Item,
      icon: 'local_dining',
      url: 'meals/cooking/' + item.slug,
    }))
  })
);

export const sideNavigationSelector = createSelector(
  cookingInstructionsSelector,
  cookingInstruction => [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: MenuItemType.Item,
      icon: 'apps',
      url: 'dashboard',
    },
    {
      id: 'meals',
      title: 'Meals',
      type: MenuItemType.Item,
      icon: 'local_dining',
      url: 'meals/all',
    },
    cookingInstruction
  ]
);
