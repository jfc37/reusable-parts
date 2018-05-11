import { createSelector } from '@ngrx/store';
import { hasCreateBlockErroredSelector } from '../../../state/block-state/creating-block/creating-block.selectors';
import {
  isLoadingTeachersSelector,
  loadingTeachersErrorMessageSelector,
} from '../../../state/teachers-state/teachers.selectors';

export const createErrorMessageSelector = createSelector(
  hasCreateBlockErroredSelector,
  hasError => hasError && 'Problem creating block. Please try again.',
);

export const warningMessagesSelector = createSelector(createErrorMessageSelector, (...messages) =>
  messages.filter(Boolean),
);

export const loadingSelector = createSelector(isLoadingTeachersSelector, Boolean);

export const fatalErrorMessagesSelector = createSelector(loadingTeachersErrorMessageSelector, (...messages) =>
  messages.filter(Boolean),
);
