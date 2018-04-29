import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  isLoadingAll,
  shouldLoadAll,
  hasAllErrored,
} from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';
import {
  isCreatingSelectorFn,
  hasCreateErroredSelectorFn,
  shouldCreateSelectorFn,
} from '@reusable-parts/common-ngrx-patterns/src/create-state/create.selector';

const selector = createSelector(
  blockFeatureSelector,
  state => state.creatingBlock
);

export const isCreatingBlockSelector = isCreatingSelectorFn(selector);

export const hasCreateBlockErroredSelector = hasCreateErroredSelectorFn(
  selector
);

export const shouldCreateBlockSelector = shouldCreateSelectorFn(selector);
