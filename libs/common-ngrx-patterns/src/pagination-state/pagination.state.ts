import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { paginationKeyToId } from '@reusable-parts/common-ngrx-patterns';

export interface PaginationKey {
  orderBy: string;
  sortDirection: SortDirection;
  startAfter?: string;
  endAt?: string;
  pageSize: number;
  pageNumber: number;
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface PaginationData {
  key: PaginationKey;
  ids: string[];
}

export interface PaginationDataState extends EntityState<PaginationData> {
  currentOrderBy: string;
  currentSortDirection: SortDirection;
}
