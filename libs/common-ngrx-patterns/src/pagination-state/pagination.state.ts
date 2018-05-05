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
