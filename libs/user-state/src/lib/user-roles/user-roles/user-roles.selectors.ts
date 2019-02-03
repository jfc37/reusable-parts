import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/lib/user-feature.reducer';
import { userRolesAdapter } from '@reusable-parts/user-state/src/lib/user-roles/user-roles/user-roles.state';

const selector = createSelector(
  userFeatureSelector,
  state => state.userRoles,
);

export const allUserRolesSelector = createSelector(
  selector,
  userRolesAdapter.getSelectors().selectAll,
);

export function userIdsWithRoleSelectorFactory(role: string) {
  return createSelector(
    allUserRolesSelector,
    userRoles => userRoles.filter(userRole => userRole[role]).map(userRole => userRole.id),
  );
}
