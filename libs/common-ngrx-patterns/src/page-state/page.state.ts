import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { pageKeyToId } from '@reusable-parts/common-ngrx-patterns';

export interface PageKey {
  orderBy: string;
  sortDirection: SortDirection;
  startAfter?: string;
  endAt?: string;
  pageSize: number;
  pageNumber: number;
  isFinalPage?: boolean;
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface Page {
  key: PageKey;
  ids: string[];
}

export interface PageState extends EntityState<Page> {
  currentOrderBy: string;
  currentSortDirection: SortDirection;
}
