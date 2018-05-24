import { createSelector } from '@ngrx/store';
import { blockFeatureSelector } from '../block-feature.reducer';
import { blockAdapter } from './blocks.state';
import { blockIdsForCurrentPagesSelector } from '../block-pages/block-pages.selectors';
import { isArrayEmpty } from '@reusable-parts/common-functions/src';

const selector = createSelector(blockFeatureSelector, state => state.blocks);

export const blockEntitiesSelector = createSelector(selector, blockAdapter.getSelectors().selectEntities);

const blocksSelector = createSelector(selector, blockAdapter.getSelectors().selectAll);

export const blocksDictionarySelector = createSelector(selector, blockAdapter.getSelectors().selectEntities);

export const blocksForCurrentPagesSelector = createSelector(
  blocksSelector,
  blockIdsForCurrentPagesSelector,
  (allBlocks, ids) => allBlocks.filter(block => ids.includes(block.id)),
);

export const hasNoBlocksSelector = createSelector(blocksSelector, isArrayEmpty);
