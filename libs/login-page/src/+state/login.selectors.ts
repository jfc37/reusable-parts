import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginData } from "@reusable-parts/login-page/src/+state/login.reducer";

const loginFeatureSelector = createFeatureSelector<LoginData>('login');

export const isLoggingInSelector = createSelector(
  loginFeatureSelector,
  login => login.isLoggingIn
);
