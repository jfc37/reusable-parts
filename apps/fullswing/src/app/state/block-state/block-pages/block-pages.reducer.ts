import { Update, EntityState } from '@ngrx/entity';
import {
  getInitialPageState,
  PageState,
  pageAdapter,
  SortDirection,
  pageKeyToId,
} from '@reusable-parts/common-ngrx-patterns/src';
import { BlockPagesActions, BlockPagesActionTypes } from './block-pages.actions';

export function blockPagesReducer(
  state = getInitialPageState('startDate', SortDirection.Descending),
  action: BlockPagesActions,
): PageState {
  switch (action.type) {
    case BlockPagesActionTypes.Reset:
      return getInitialPageState('startDate', SortDirection.Descending);

    case BlockPagesActionTypes.Set:
      return pageAdapter.upsertMany(
        action.pages.map(page => ({
          id: pageKeyToId(page.key),
          changes: page,
        })),
        state,
      );

    case BlockPagesActionTypes.ChangeSortOrder:
      return {
        ...state,
        currentOrderBy: action.orderBy,
        currentSortDirection: action.sortDirection,
      };

    default:
      return state;
  }
}
