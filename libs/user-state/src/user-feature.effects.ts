import { LoadingUserRolesEffects } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.effects';
import { LoadingUsersEffects } from '@reusable-parts/user-state/src/users/loading-users/loading-users.effects';

export const userFeatureEffects = [
  LoadingUserRolesEffects,
  LoadingUsersEffects,
];
