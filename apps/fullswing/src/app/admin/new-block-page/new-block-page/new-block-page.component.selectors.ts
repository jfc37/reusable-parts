import { createSelector } from '@ngrx/store';
import { hasCreateBlockErroredSelector } from '../../../state/blocks/block-state/creating-block/creating-block.selectors';

export const createErrorMessageSelector = createSelector(
  hasCreateBlockErroredSelector,
  hasError => hasError && 'Problem creating block. Please try again.'
);

export const warningMessagesSelector = createSelector(
  createErrorMessageSelector,
  (...messages) => messages.filter(Boolean)
);
