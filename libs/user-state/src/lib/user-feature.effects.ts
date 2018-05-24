import { LoadingUserRolesEffects } from '@reusable-parts/user-state/src/lib/user-roles/loading-user-roles/loading-user-roles.effects';
import { LoadingUsersEffects } from '@reusable-parts/user-state/src/lib/users/loading-users/loading-users.effects';
import { UpdatingUserRolesEffects } from '@reusable-parts/user-state/src/lib/user-roles/updating-user-roles/updating-user-roles.effects';
import { RemovingUserRolesEffects } from '@reusable-parts/user-state/src/lib/user-roles/removing-user-roles/removing-user-roles.effects';

export const userFeatureEffects = [
  LoadingUserRolesEffects,
  UpdatingUserRolesEffects,
  RemovingUserRolesEffects,
  LoadingUsersEffects,
];
