import { createSelector } from '@ngrx/store';
import { blockFeatureSelector } from '../block-feature.reducer';
import { blockAdapter } from './blocks.state';
import { blockIdsForCurrentPagesSelector } from '../block-pages/block-pages.selectors';

const selector = createSelector(blockFeatureSelector, state => state.blocks);

const blockEntitiesSelector = createSelector(
  selector,
  blockAdapter.getSelectors().selectEntities
);

const blocksSelector = createSelector(
  selector,
  blockAdapter.getSelectors().selectAll
);

export const allBlocksSelector = blocksSelector;

export const blocksForCurrentPagesSelector = createSelector(
  allBlocksSelector,
  blockIdsForCurrentPagesSelector,
  (allBlocks, ids) => allBlocks.filter(block => ids.includes(block.id))
);
