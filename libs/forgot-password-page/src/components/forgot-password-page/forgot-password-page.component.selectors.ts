import { createSelector } from '@ngrx/store';
import { isResettingSelector, hasResetSelector } from '@reusable-parts/forgot-password-page/src/+state/reset.selectors';
import { isAtleastOneArgumentsTruthy } from '@reusable-parts/common-functions';

export const disabledSelector = createSelector(isResettingSelector, hasResetSelector, isAtleastOneArgumentsTruthy);
