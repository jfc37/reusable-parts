import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface DeleteStatus {
  id: string;
  deleting: boolean;
  deleted: boolean;
  error: string;
}

export interface DeleteState extends EntityState<DeleteStatus> {}

export const deleteAdapter = createEntityAdapter<DeleteStatus>({
  selectId: deleteStatus => deleteStatus.id,
});

export function getInitialDeleteState(): EntityState<DeleteStatus> {
  return {
    ...deleteAdapter.getInitialState(),
  };
}

export function getDefaultDeleteStatus(id: string): DeleteStatus {
  return {
    id,
    deleting: false,
    deleted: false,
    error: null,
  };
}

export function getDeletingStatus(id: string): DeleteStatus {
  return {
    id,
    deleting: true,
    deleted: false,
    error: null,
  };
}

export function getDeletedStatus(id: string): DeleteStatus {
  return {
    id,
    deleting: false,
    deleted: true,
    error: null,
  };
}

export function getDeleteErrorStatus(id: string, error: string): DeleteStatus {
  return {
    id,
    deleting: false,
    deleted: false,
    error: error || 'Issue deleting',
  };
}
