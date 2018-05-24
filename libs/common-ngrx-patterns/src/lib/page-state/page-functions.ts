import { createEntityAdapter } from '@ngrx/entity';
import { getLastItemInArray } from '@reusable-parts/common-functions/src';
import {
  Page,
  PageKey,
  PageState,
  SortDirection,
} from '@reusable-parts/common-ngrx-patterns/src/lib/page-state/page.state';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

export const DEFAULT_PAGE_SIZE = 50;

export function loadPage<T extends { id?: string }>(
  af: AngularFirestore,
  key: PageKey,
  collection: string,
): Observable<T[]> {
  let query = af.firestore
    .collection(collection)
    .orderBy(key.orderBy, key.sortDirection)
    .limit(key.pageSize);

  if (key.startAfter) {
    query = query.startAfter(key.startAfter);
  }

  return fromPromise(query.get()).pipe(map(data => data.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))));
}

export function pageKeyToId(key: PageKey): string {
  return [
    key.orderBy,
    key.sortDirection,
    key.startAfter,
    key.endAt,
    key.pageNumber,
    key.pageSize,
    key.isFinalPage,
  ].join('|');
}

export function idToPageKey(id: string): PageKey {
  const [orderBy, sortDirectionStr, startAfter, endAt, pageNumberStr, pageSizeStr, , isFinalPageStr] = id.split('|');
  const sortDirection = sortDirectionStr as SortDirection;
  const pageNumber = Number(pageNumberStr);
  const pageSize = Number(pageSizeStr);
  const isFinalPage = isFinalPageStr === 'true';
  return {
    orderBy,
    sortDirection,
    startAfter,
    endAt,
    pageNumber,
    pageSize,
    isFinalPage,
  };
}

export function getFirstPageKey(orderBy: string, sortDirection: SortDirection): PageKey {
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

export function getNewKey(key: PageKey, results: any[]): PageKey {
  const endAt = (getLastItemInArray(results) || {})[key.orderBy];
  const isFinalPage = results.length < key.pageSize;
  return { ...key, endAt, isFinalPage };
}

export const pageAdapter = createEntityAdapter<Page>({
  selectId: page => pageKeyToId(page.key),
});

export function getInitialPageState(
  defaultOrderBy: string,
  sortDirection: SortDirection = SortDirection.Ascending,
): PageState {
  return {
    ...pageAdapter.getInitialState(),
    currentOrderBy: defaultOrderBy,
    currentSortDirection: sortDirection,
  };
}

export function createPage(key: PageKey, results: Array<{ id?: string }>): Page {
  return {
    ids: results.map(data => data.id),
    key,
  };
}
