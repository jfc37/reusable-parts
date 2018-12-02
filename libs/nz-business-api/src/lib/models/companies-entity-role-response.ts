import { PagedResponse } from './paged-response';

export interface CompaniesEntityRoleResponse extends PagedResponse {
  roles: CompanyEntityRole[];
}

export interface CompanyEntityRole {
  middleName: string;
  lastName: string;
  appointmentDate: string;
  associatedCompanyNumber: string;
  associatedCompanyNzbn: number;
  associatedCompanyStatusCode: string;
  status: string;
  resignationDate: string;
  name: string;
  nzbn: number;
  entityNumber: number;
  historicNames: string[];
  shareholdings: Shareholding[];
  roleType: string;
  physicalAddress: Address;
  firstName: string;
  associatedCompanyName: string;
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
