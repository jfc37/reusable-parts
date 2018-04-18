import { createSelector } from "@ngrx/store";
import { mealsFeatureSelector } from "../meals-feature.selectors";

const selector = createSelector(
  mealsFeatureSelector,
  state => state.mealLoading
);

export const hasLoadedAllMealsSelector = createSelector(
  selector,
  state => state.loadedAll,
);

export const isLoadingAllMealsSelector = createSelector(
  selector,
  state => state.loadingAll,
);

export const hasFailedLoadingAllMealsSelector = createSelector(
  selector,
  state => Boolean(state.error),
);

export const shouldLoadAllMealsSelector = createSelector(
  hasLoadedAllMealsSelector,
  isLoadingAllMealsSelector,
  (...loading: boolean[]) => !loading.some(Boolean),
);
