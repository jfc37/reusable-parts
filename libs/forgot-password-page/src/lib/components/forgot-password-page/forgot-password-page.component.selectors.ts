import { createSelector } from '@ngrx/store';
import {
  isResettingSelector,
  hasResetSelector,
} from '@reusable-parts/forgot-password-page/src/lib/+state/reset.selectors';
import { isAtleastOneArgumentsTruthy } from '@reusable-parts/common-functions/src';

export const disabledSelector = createSelector(isResettingSelector, hasResetSelector, isAtleastOneArgumentsTruthy);
