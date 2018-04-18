import { EntityState } from "@ngrx/entity";

export interface MealLoadingState {
  loadingAll: boolean;
  loadedAll: boolean;
  error: string;
}
