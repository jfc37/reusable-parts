import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResetData } from '@reusable-parts/forgot-password-page/src/+state/reset.reducer';

const resetFeatureSelector = createFeatureSelector<ResetData>('forgotPassword');

export const isResettingSelector = createSelector(resetFeatureSelector, state => state.isResetting);

export const hasResetSelector = createSelector(resetFeatureSelector, state => state.hasReset);

export const emailResetSelector = createSelector(resetFeatureSelector, state => state.email);

export const resetErrorMessageSelector = createSelector(resetFeatureSelector, state => state.resetErrorMessage);
