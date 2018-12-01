import { PageRequest } from './page-request';

export interface CompaniesEntityRoleRequest extends PageRequest {
  name: string;
  registeredOnly?: boolean;
  roleType?: CompanyEntityRoleType;
}

export enum CompanyEntityRoleType {
  Shareholder = 'SHR',
  Director = 'DIR',
  All = 'ALL',
}
