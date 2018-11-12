import { createSelector } from '@ngrx/store';
import { addWeeks, format } from 'date-fns';
import { blocksForCurrentPagesSelector } from '../../../state/block-state/blocks/blocks.selectors';
import { BlockRowModel, BlockStatusTypes } from '../components/blocks-table/blocks-table.component';
import { hasNotLoadedAnyBlockPagesSelector } from '../../../state/block-state/loading-block-pages/loading-block-pages.selectors';
import { isAtleastOneArgumentsTruthy, includeOnlyTruthyArguments } from '@reusable-parts/common-functions/src';
import {
  allGeneratingBlockIdsSelector,
  hasAnyBlockGenerateErroredSelector,
} from '../../../state/block-state/generating-block/generating-block.selectors';
import {
  allDeletingBlockIdsSelector,
  hasAnyBlockDeleteErroredSelector,
} from '../../../state/block-state/deleting-block/deleting-block.selectors';

export const isLoadingSelector = createSelector(
  hasNotLoadedAnyBlockPagesSelector,
  isAtleastOneArgumentsTruthy,
);

export const blockRowsSelector = createSelector(
  blocksForCurrentPagesSelector,
  allGeneratingBlockIdsSelector,
  allDeletingBlockIdsSelector,
  (blocks, generatingIds, deletingIds) =>
    blocks.map(
      block =>
        ({
          id: block.id,
          name: block.name,
          startDate: block.startDate,
          day: format(block.startDate, 'dddd'),
          status: BlockStatusTypes.Active,
          time: block.startTime,
          between:
            format(block.startDate, 'DD MMMM') +
            ' - ' +
            format(addWeeks(block.startDate, block.numberOfClasses - 1), 'DD MMMM'),
          disableGenerate: generatingIds.includes(block.id),
          disableDelete: deletingIds.includes(block.id),
        } as BlockRowModel),
    ),
);

const generateBlockErrorMessageSelector = createSelector(
  hasAnyBlockGenerateErroredSelector,
  hasError => hasError && 'Problem generating block. Please try again',
);

const deleteBlockErrorMessageSelector = createSelector(
  hasAnyBlockDeleteErroredSelector,
  hasError => hasError && 'Problem deleting block. Please try again',
);

export const warningMessagesSelector = createSelector(
  generateBlockErrorMessageSelector,
  deleteBlockErrorMessageSelector,
  includeOnlyTruthyArguments,
);
