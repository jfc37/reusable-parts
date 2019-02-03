import { createSelector } from '@ngrx/store';
import { hasNotLoadedAnyBlockPagesSelector } from '../../../state/block-state/loading-block-pages/loading-block-pages.selectors';
import { isAtleastOneArgumentsTruthy } from '@reusable-parts/common-functions/src';
import { Block, getBlockEndTime } from '../../../state/block-state/block';
import { upcomingBlocksSelector } from '../../../state/block-state/blocks/blocks.selectors';
import { format } from 'date-fns';
import { BlockCardModel } from '../components/block-card/block-card.component.model';
import {
  isLoadingEnrolmentSelector,
  hasEnrolmentLoadErroredSelector,
} from '../../../state/student-enrolment-state/loading-student-enrolment/loading-student-enrolment.selectors';
import { enrolmentsForCurrentUserSelector } from '../../../state/student-enrolment-state/student-enrolment/student-enrolment.selectors';
import {
  currentUserEnrollingIds,
  hasEnrolmentUpdateErroredSelector,
} from '../../../state/student-enrolment-state/updating-student-enrolment/updating-student-enrolment.selectors';

export const updateErrorMessageSelector = createSelector(
  hasEnrolmentUpdateErroredSelector,
  hasError => hasError && 'Problem enrolling in block. Please try again.',
);

export const warningMessagesSelector = createSelector(
  updateErrorMessageSelector,
  (...messages) => messages.filter(Boolean),
);

export const enrolmentsLoadErrorMessageSelector = createSelector(
  hasEnrolmentLoadErroredSelector,
  hasErrored => hasErrored && 'Problem getting enrolment',
);

export const fatalErrorMessagesSelector = createSelector(
  enrolmentsLoadErrorMessageSelector,
  (...messages) => messages.filter(Boolean),
);

export const isLoadingSelector = createSelector(
  hasNotLoadedAnyBlockPagesSelector,
  isLoadingEnrolmentSelector,
  isAtleastOneArgumentsTruthy,
);

export const modelSelector = createSelector(
  upcomingBlocksSelector,
  enrolmentsForCurrentUserSelector,
  currentUserEnrollingIds,
  getModel,
);
function getModel(blocks: Block[], enroledIds: string[], enrollingIds: string[]) {
  return blocks
    .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
    .map(block => ({
      title: 'Starting ' + format(block.startDate, 'dddd, Do MMMM'),
      cards: [
        {
          title: block.name,
          id: block.id,
          disabled: [...enrollingIds, ...enroledIds].includes(block.id),
          time: block.startTime + ' - ' + getBlockEndTime(block),
          enrolButtonText: enroledIds.includes(block.id) ? 'Already enroled' : 'Enrol',
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
