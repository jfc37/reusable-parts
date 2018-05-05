import { createSelector } from '@ngrx/store';
import { addWeeks, format } from 'date-fns';
import { blocksForCurrentPagesSelector } from '../../../state/block-state/blocks/blocks.selectors';
import {
  BlockRowModel,
  BlockStatusTypes,
} from '../components/blocks-table/blocks-table.component';
import { hasNotLoadedAnyBlockPagesSelector } from '../../../state/block-state/loading-block-pages/loading-block-pages.selectors';
import { isAtleastOneArgumentsTruthy } from '@reusable-parts/common-functions';

export const isLoadingSelector = createSelector(
  hasNotLoadedAnyBlockPagesSelector,
  isAtleastOneArgumentsTruthy
);

export const blockRowsSelector = createSelector(
  blocksForCurrentPagesSelector,
  blocks =>
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
            format(
              addWeeks(block.startDate, block.numberOfClasses - 1),
              'DD MMMM'
            ),
          disableDelete: false,
          disableGenerate: false,
        } as BlockRowModel)
    )
);
