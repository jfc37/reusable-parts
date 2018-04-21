export interface AppState {
  readonly mealItems: NavItem[];
}

export interface NavItem {
  name: string;
  slug: string;
}
