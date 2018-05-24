import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface LoadStatus {
  id: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const loadAdapter = createEntityAdapter<LoadStatus>({
  selectId: loadStatus => loadStatus.id,
});

export function getInitialLoadState(): EntityState<LoadStatus> {
  return {
    ...loadAdapter.getInitialState(),
  };
}

export function getDefaultLoadStatus(id: string): LoadStatus {
  return {
    id,
    loading: false,
    loaded: false,
    error: null,
  };
}

export function getLoadingStatus(id: string): LoadStatus {
  return {
    id,
    loading: true,
    loaded: false,
    error: null,
  };
}

export function getLoadedStatus(id: string): LoadStatus {
  return {
    id,
    loading: false,
    loaded: true,
    error: null,
  };
}

export function getLoadErrorStatus(id: string, error: string): LoadStatus {
  return {
    id,
    loading: false,
    loaded: false,
    error: error || 'Issue loading',
  };
}
