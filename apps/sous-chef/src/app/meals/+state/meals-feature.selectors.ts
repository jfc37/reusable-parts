import { createFeatureSelector } from "@ngrx/store";
import { MealsFeatureState } from "./meals-feature.state";

export const mealsFeatureSelector = createFeatureSelector<MealsFeatureState>('meals');
