import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterData } from '@reusable-parts/register-page/src/lib/+state/register.reducer';

const registerFeatureSelector = createFeatureSelector<RegisterData>('register');

export const isRegisteringSelector = createSelector(registerFeatureSelector, state => state.isRegistering);

export const hasRegisteredSelector = createSelector(registerFeatureSelector, state => state.hasRegistered);

export const accountSelector = createSelector(registerFeatureSelector, state => ({
  name: state.name,
  email: state.email,
  password: state.password,
}));

export const registerErrorMessageSelector = createSelector(
  registerFeatureSelector,
  state => state.registerErrorMessage,
);
