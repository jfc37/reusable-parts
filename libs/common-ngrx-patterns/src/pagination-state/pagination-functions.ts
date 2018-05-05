import {
  PaginationKey,
  SortDirection,
  PaginationData,
  PaginationDataState,
} from '@reusable-parts/common-ngrx-patterns/src/pagination-state/pagination.state';
import { AngularFireAuth } from 'angularfire2/auth';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { getLastItemInArray } from '@reusable-parts/common-functions';
import { createEntityAdapter } from '@ngrx/entity';

export function loadPage<T extends { id?: string }>(
  af: AngularFireAuth,
  key: PaginationKey,
  collection: string
): Observable<T[]> {
  let query = af.app
    .firestore()
    .collection(collection)
    .orderBy(key.orderBy, key.sortDirection)
    .limit(key.pageSize);

  if (key.startAfter) {
    query = query.startAfter(key.startAfter);
  }

  return fromPromise(query.get()).map(data =>
    data.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
  );
}

export function paginationKeyToId(key: PaginationKey): string {
  return [
    key.orderBy,
    key.sortDirection,
    key.startAfter,
    key.endAt,
    key.pageNumber,
    key.pageSize,
  ].join('|');
}

export function idToPaginationKey(id: string): PaginationKey {
  const [
    orderBy,
    sortDirectionStr,
    startAfter,
    endAt,
    pageNumberStr,
    pageSizeStr,
  ] = id.split('|');
  const sortDirection = sortDirectionStr as SortDirection;
  const pageNumber = Number(pageNumberStr);
  const pageSize = Number(pageSizeStr);
  return {
    orderBy,
    sortDirection,
    startAfter,
    endAt,
    pageNumber,
    pageSize,
  };
}

export function getFirstPageKey(
  orderBy: string,
  sortDirection: SortDirection
): PaginationKey {
  return {
    orderBy,
    sortDirection,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}

export function getNextPageKey(key: PaginationKey): PaginationKey {
  return {
    ...key,
    endAt: null,
    startAfter: key.endAt,
    pageNumber: key.pageNumber + 1,
  };
}

export const DEFAULT_PAGE_SIZE = 1;

export function getNewKey(key: PaginationKey, results: any[]): PaginationKey {
  const endAt = (getLastItemInArray(results) || {})[key.orderBy];
  return { ...key, endAt };
}

export const paginationDataAdapter = createEntityAdapter<PaginationData>({
  selectId: page => paginationKeyToId(page.key),
});

export function getInitialPaginationDataState(
  defaultOrderBy: string
): PaginationDataState {
  return {
    ...paginationDataAdapter.getInitialState(),
    currentOrderBy: defaultOrderBy,
    currentSortDirection: SortDirection.Ascending,
  };
}

export function createPage(
  key: PaginationKey,
  results: Array<{ id?: string }>
): PaginationData {
  return {
    ids: results.map(data => data.id),
    key,
  };
}
