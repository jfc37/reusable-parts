import { createSelector } from '@ngrx/store';
import { hasNotLoadedAnyBlockPagesSelector } from '../../../state/block-state/loading-block-pages/loading-block-pages.selectors';
import { isAtleastOneArgumentsTruthy } from '@reusable-parts/common-functions';
import { Block, getBlockEndTime } from '../../../state/block-state/block';
import { upcomingBlocksSelector } from '../../../state/block-state/blocks/blocks.selectors';
import { format } from 'date-fns';
import { BlockCardModel } from '../components/block-card/block-card.component.model';

export const isLoadingSelector = createSelector(hasNotLoadedAnyBlockPagesSelector, isAtleastOneArgumentsTruthy);

export const modelSelector = createSelector(upcomingBlocksSelector, getModel);
function getModel(blocks: Block[]) {
  return blocks
    .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
    .map(block => ({
      title: 'Starting ' + format(block.startDate, 'dddd, Do MMMM'),
      cards: [
        {
          title: block.name,
          id: block.id,
          disabled: false,
          time: block.startTime + ' - ' + getBlockEndTime(block),
          enrolButtonText: 'Enrol',
        } as BlockCardModel,
      ],
    }))
    .reduce((accum: Array<{ title: string; cards: BlockCardModel[] }>, group) => {
      const match = accum.find(a => a.title === group.title);
      const matchingCards = match ? match.cards : [];
      return [
        ...accum.filter(a => a.title !== group.title),
        {
          title: group.title,
          cards: [...matchingCards, ...group.cards].sort((a, b) => (a.time < b.time ? -1 : 1)),
        },
      ];
    }, []);
}
