import { PagedResponse } from './paged-response';

export interface CompaniesEntityRoleResponse extends PagedResponse {
  roles: CompanyEntityRole[];
}

export interface CompanyEntityRole {
  firstName: string;
  middleName: string;
  lastName: string;
  roleType: string;
  status: string;
  associatedCompanyName: string;
  associatedCompanyNumber: string;
  associatedCompanyNzbn: number;
  associatedCompanyStatusCode: string;
  appointmentDate: string;
  resignationDate: string;
  nzbn: number;
  entityNumber: number;
  historicNames: string[];
  shareholdings: Shareholding[];
  physicalAddress: Address;
}

interface Shareholding {
  associatedCompanyNumber: string;
  associatedCompanyNzbn: number;
  jointlyHeld: boolean;
  sharePercentage: number;
  associatedCompanyName: string;
  associatedCompanyStatusCode: string;
  numberOfShares: number;
}

interface Address {
  addressLines: string[];
  postCode: string;
  countryCode: string;
  pafId: string;
}
