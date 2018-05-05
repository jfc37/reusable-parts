import { Update, EntityState } from '@ngrx/entity';
import {
  getInitialPageState,
  PageState,
  pageAdapter,
} from '@reusable-parts/common-ngrx-patterns';
import {
  BlockPagesActions,
  BlockPagesActionTypes,
} from './block-pages.actions';

export function blockPagesReducer(
  state = getInitialPageState('name'),
  action: BlockPagesActions
): PageState {
  switch (action.type) {
    case BlockPagesActionTypes.Set:
      return pageAdapter.addOne(action.page, state);

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
