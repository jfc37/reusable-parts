/**
 * Roles a user can have
 */
export interface FullSwingRoles {
  student: boolean;
  teacher?: boolean;
  admin?: boolean;
}

/**
 * When creating a new user, they should be a student only
 */
export function getDefaultNewUserRoles(): FullSwingRoles {
  return {
    student: true,
    teacher: false,
    admin: false,
  };
}

export enum FullSwingRoleTypes {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}
