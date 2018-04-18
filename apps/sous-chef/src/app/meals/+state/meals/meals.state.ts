import { EntityState } from "@ngrx/entity";

export interface Meal {
  id: string;
  name: string;
}

export interface MealState extends EntityState<Meal> {}
