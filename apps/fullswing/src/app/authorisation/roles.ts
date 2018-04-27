/**
 * Roles a user can have
 */
export interface UserRoles {
  student: boolean;
  teacher?: boolean;
  admin?: boolean;
}

/**
 * When creating a new user, they should be a student only
 */
export function getDefaultNewUserRoles(): UserRoles {
  return {
    student: true,
    teacher: false,
    admin: false,
  };
}
