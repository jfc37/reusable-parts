import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UpdateStatus {
  id: string;
  updating: boolean;
  updated: boolean;
  error: string;
}

export const updateAdapter = createEntityAdapter<UpdateStatus>({
  selectId: updateStatus => updateStatus.id,
});

export function getDefaultUpdateStatus(id: string): UpdateStatus {
  return {
    id,
    updating: false,
    updated: false,
    error: null,
  };
}

export function getUpdatingStatus(id: string): UpdateStatus {
  return {
    id,
    updating: true,
    updated: false,
    error: null,
  };
}

export function getUpdatedStatus(id: string): UpdateStatus {
  return {
    id,
    updating: false,
    updated: true,
    error: null,
  };
}

export function getUpdateErrorStatus(id: string, error: string): UpdateStatus {
  return {
    id,
    updating: false,
    updated: false,
    error: error || 'Issue updating',
  };
}
