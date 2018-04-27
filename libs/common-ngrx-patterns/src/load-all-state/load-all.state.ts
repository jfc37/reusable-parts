export interface LoadAllState {
  loadingAll: boolean;
  loadedAll: boolean;
  error: string;
}

export function getDefaultLoadAllState(): LoadAllState {
  return {
    loadingAll: false,
    loadedAll: false,
    error: null,
  };
}

export function getLoadingAllState(): LoadAllState {
  return {
    loadingAll: true,
    loadedAll: false,
    error: null,
  };
}

export function getLoadedAllState(): LoadAllState {
  return {
    loadingAll: false,
    loadedAll: true,
    error: null,
  };
}

export function getLoadedAllErrorState(error: string): LoadAllState {
  return {
    loadingAll: false,
    loadedAll: false,
    error,
  };
}
