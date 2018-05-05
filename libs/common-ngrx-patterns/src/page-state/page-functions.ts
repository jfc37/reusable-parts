import { createEntityAdapter } from '@ngrx/entity';
import { getLastItemInArray } from '@reusable-parts/common-functions';
import {
  Page,
  PageKey,
  PageState,
  SortDirection,
} from '@reusable-parts/common-ngrx-patterns/src/page-state/page.state';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';

export function loadPage<T extends { id?: string }>(
  af: AngularFireAuth,
  key: PageKey,
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

  return fromPromise(query.get()).pipe(
    map(data => data.docs.map(doc => ({ id: doc.id, ...doc.data() } as T)))
  );
}

export function pageKeyToId(key: PageKey): string {
  return [
    key.orderBy,
    key.sortDirection,
    key.startAfter,
    key.endAt,
    key.pageNumber,
    key.pageSize,
  ].join('|');
}

export function idToPageKey(id: string): PageKey {
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
): PageKey {
  return {
    orderBy,
    sortDirection,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}

export function getNextPageKey(key: PageKey): PageKey {
  return {
    ...key,
    endAt: null,
    startAfter: key.endAt,
    pageNumber: key.pageNumber + 1,
  };
}

export const DEFAULT_PAGE_SIZE = 1;

export function getNewKey(key: PageKey, results: any[]): PageKey {
  const endAt = (getLastItemInArray(results) || {})[key.orderBy];
  return { ...key, endAt };
}

export const pageAdapter = createEntityAdapter<Page>({
  selectId: page => pageKeyToId(page.key),
});

export function getInitialPageState(defaultOrderBy: string): PageState {
  return {
    ...pageAdapter.getInitialState(),
    currentOrderBy: defaultOrderBy,
    currentSortDirection: SortDirection.Ascending,
  };
}

export function createPage(
  key: PageKey,
  results: Array<{ id?: string }>
): Page {
  return {
    ids: results.map(data => data.id),
    key,
  };
}
