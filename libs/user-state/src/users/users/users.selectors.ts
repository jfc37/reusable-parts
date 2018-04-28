import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import { userAdapter } from '@reusable-parts/user-state/src/users/users/users.state';
import { userIdsWithRoleSelectorFactory } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.selectors';

const selector = createSelector(userFeatureSelector, state => state.users);

const userEntitiesSelector = createSelector(
  selector,
  userAdapter.getSelectors().selectEntities
);

export function allUsersWithRoleFactory(role: string) {
  return createSelector(
    userEntitiesSelector,
    userIdsWithRoleSelectorFactory(role),
    (users, userIds) => userIds.map(id => users[id]).filter(Boolean)
  );
}
