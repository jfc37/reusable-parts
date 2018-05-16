import { createSelector } from '@ngrx/store';
import { hasNotLoadedAnyBlockPagesSelector } from '../../../state/block-state/loading-block-pages/loading-block-pages.selectors';
import { isAtleastOneArgumentsTruthy } from '@reusable-parts/common-functions';

export const isLoadingSelector = createSelector(hasNotLoadedAnyBlockPagesSelector, isAtleastOneArgumentsTruthy);
