import { createSelector } from '@ngrx/store';
import { blockFeatureSelector } from '../block-feature.reducer';
import {
  currentOrderAndDirectionSelectorFn,
  hasAnyCurrentPagesSelectorFn,
  latestCurrentPageKeySelectorFn,
  dataIdsForCurrentPagesSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  blockFeatureSelector,
  state => state.blockPages
);

export const currentBlockPageOrderAndDirectionSelector = currentOrderAndDirectionSelectorFn(
  selector
);

export const hasAnyCurrentBlockPagesSelector = hasAnyCurrentPagesSelectorFn(
  selector
);

export const latestCurrentBlockPageSelector = latestCurrentPageKeySelectorFn(
  selector
);

export const blockIdsForCurrentPagesSelector = dataIdsForCurrentPagesSelectorFn(
  selector
);