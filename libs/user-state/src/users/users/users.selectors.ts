import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import { userAdapter } from '@reusable-parts/user-state/src/users/users/users.state';
import { userIdsWithRoleSelectorFactory } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.selectors';

const selector = createSelector(userFeatureSelector, state => state.users);

const userEntitiesSelector = createSelector(selector, userAdapter.getSelectors().selectEntities);

const usersSelector = createSelector(selector, userAdapter.getSelectors().selectAll);

export function allUsersWithRoleFactory(role: string) {
  return createSelector(userEntitiesSelector, userIdsWithRoleSelectorFactory(role), (users, userIds) =>
    userIds.map(id => users[id]).filter(Boolean),
  );
}

export function allUsersWithoutRoleFactory(role: string) {
  return createSelector(usersSelector, userIdsWithRoleSelectorFactory(role), (users, userIds) =>
    users.filter(user => !userIds.includes(user.id)),
  );
}
