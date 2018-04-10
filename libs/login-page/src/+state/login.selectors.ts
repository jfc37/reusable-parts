import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginData } from "@reusable-parts/login-page/src/+state/login.reducer";

const loginFeatureSelector = createFeatureSelector<LoginData>('login');

export const isLoggingInSelector = createSelector(
  loginFeatureSelector,
  state => state.isLoggingIn
);

export const emailAndPasswordSelector = createSelector(
  loginFeatureSelector,
  state => ({ email: state.email, password: state.password})
);

export const loginErrorMessageSelector = createSelector(
  loginFeatureSelector,
  state => state.loginErrorMessage
);
