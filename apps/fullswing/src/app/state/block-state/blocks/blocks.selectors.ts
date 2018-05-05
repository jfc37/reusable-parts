import { createSelector } from '@ngrx/store';
import { blockFeatureSelector } from '../block-feature.reducer';
import { blockAdapter } from './blocks.state';

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
