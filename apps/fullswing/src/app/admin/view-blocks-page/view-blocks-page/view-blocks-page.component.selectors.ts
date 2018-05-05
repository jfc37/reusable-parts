import { allBlocksSelector } from '../../../state/block-state/blocks/blocks.selectors';
import { createSelector } from '@ngrx/store';
import {
  BlockRowModel,
  BlockStatusTypes,
} from '../components/blocks-table/blocks-table.component';
import { format, addWeeks } from 'date-fns';

export const blockRowsSelector = createSelector(allBlocksSelector, blocks =>
  blocks.map(
    block =>
      ({
        id: block.id,
        name: block.name,
        day: format(block.startDate, 'dddd'),
        status: BlockStatusTypes.Active,
        time: block.startTime,
        between:
          format(block.startDate, 'DD MMM') +
          ' - ' +
          format(
            addWeeks(block.startDate, block.numberOfClasses - 1),
            'DD MMM'
          ),
        disableDelete: false,
        disableGenerate: false,
      } as BlockRowModel)
  )
);
