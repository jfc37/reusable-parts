import { LoadAllState } from '@reusable-parts/common-ngrx-patterns';

export function isLoadingAll(state: LoadAllState): boolean {
  return state.loadingAll;
}

export function hasLoadedAll(state: LoadAllState): boolean {
  return state.loadedAll;
}

export function hasAllErrored(state: LoadAllState): boolean {
  return Boolean(state.error);
}

export function shouldLoadAll(state: LoadAllState): boolean {
  return !isLoadingAll(state) && !hasLoadedAll(state) && !hasAllErrored(state);
}
