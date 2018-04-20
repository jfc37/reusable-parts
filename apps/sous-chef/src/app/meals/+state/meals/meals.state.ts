import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface Meal {
  id: string;
  name: string;
  link: string;
}

export interface MealState extends EntityState<Meal> {}

export const mealAdapter = createEntityAdapter<Meal>({
  selectId: meal => meal.id,
});
