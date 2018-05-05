import { Action } from '@ngrx/store';
import {
  PaginationData,
  SortDirection,
} from '@reusable-parts/common-ngrx-patterns';

export enum BlockPagesActionTypes {
  Set = '[Block Pages] Set',

  ChangeSortOrder = '[Block Pages] Change Sort Order',
}

export class SetBlockPage implements Action {
  readonly type = BlockPagesActionTypes.Set;

  constructor(public page: PaginationData) {}
}

export class ChangeBlockSortOrder implements Action {
  readonly type = BlockPagesActionTypes.ChangeSortOrder;

  constructor(public orderBy: string, public sortDirection: SortDirection) {}
}

export type BlockPagesActions = SetBlockPage | ChangeBlockSortOrder;
