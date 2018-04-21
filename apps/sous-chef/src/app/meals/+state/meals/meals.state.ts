import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface Meal {
  id: string;
  slug: string;
  name: string;
  link: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
  cookingSteps: string[];
}

export interface Ingredient {
  quantity: string;
  food: string;
}

export interface MealState extends EntityState<Meal> {
  currentSlug: string;
}

export const mealAdapter = createEntityAdapter<Meal>({
  selectId: meal => meal.id,
});

export function getInitialMealState(): MealState {
  return {
    currentSlug: null,
    ...mealAdapter.getInitialState(),
  }
}
