import { Update, EntityState } from '@ngrx/entity';
import {
  getInitialPaginationDataState,
  PaginationDataState,
  paginationDataAdapter,
} from '@reusable-parts/common-ngrx-patterns';
import {
  BlockPagesActions,
  BlockPagesActionTypes,
} from './block-pages.actions';

export function blockPagesReducer(
  state = getInitialPaginationDataState('name'),
  action: BlockPagesActions
): PaginationDataState {
  switch (action.type) {
    case BlockPagesActionTypes.Set:
      return paginationDataAdapter.addOne(action.page, state);

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
