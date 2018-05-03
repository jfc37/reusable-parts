import { createSelector, MemoizedSelector } from '@ngrx/store';
import { updateAdapter } from '@reusable-parts/common-ngrx-patterns/src/update-state/update.state';
import { CreateStatus } from '@reusable-parts/common-ngrx-patterns';
import { areAllArgumentsFalsy } from '@reusable-parts/common-functions';

export function isCreatingSelectorFn(
  selector: MemoizedSelector<any, CreateStatus>
) {
  return createSelector(selector, state => state.creating);
}

export function hasCreatedSelectorFn(
  selector: MemoizedSelector<any, CreateStatus>
) {
  return createSelector(selector, state => state.created);
}

export function hasCreateErroredSelectorFn(
  selector: MemoizedSelector<any, CreateStatus>
) {
  return createSelector(selector, state => state.error);
}

export function shouldCreateSelectorFn(
  selector: MemoizedSelector<any, CreateStatus>
) {
  return createSelector(
    isCreatingSelectorFn(selector),
    hasCreatedSelectorFn(selector),
    areAllArgumentsFalsy
  );
}
