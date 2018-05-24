import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserRoles {
  id: string;
}

export interface UserRolesState extends EntityState<UserRoles> {}

export const userRolesAdapter = createEntityAdapter<UserRoles>({
  selectId: userRoles => userRoles.id,
});

export function getInitialUserRolesState(): UserRolesState {
  return {
    ...userRolesAdapter.getInitialState(),
  };
}
