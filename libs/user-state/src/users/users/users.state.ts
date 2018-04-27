import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserState extends EntityState<User> {}

export const userAdapter = createEntityAdapter<User>({
  selectId: user => user.id,
});

export function getInitialUserState(): UserState {
  return {
    ...userAdapter.getInitialState(),
  };
}
