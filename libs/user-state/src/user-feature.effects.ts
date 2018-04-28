import { LoadingUserRolesEffects } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.effects';
import { LoadingUsersEffects } from '@reusable-parts/user-state/src/users/loading-users/loading-users.effects';
import { UpdatingUserRolesEffects } from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.effects';

export const userFeatureEffects = [
  LoadingUserRolesEffects,
  UpdatingUserRolesEffects,
  LoadingUsersEffects,
];
