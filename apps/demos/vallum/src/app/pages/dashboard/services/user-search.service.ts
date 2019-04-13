import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompaniesRepository } from '@reusable-parts/logic/integration/nz-business';
import { map } from 'rxjs/operators';

@Injectable()
export class UserSearchService {
  constructor(private companiesRepository: CompaniesRepository) {}

  public search(name: string): Observable<User[]> {
    return this.companiesRepository.CompaniesEntityRoleSearch({ name }).pipe(
      map(response =>
        response.roles.map(role => ({
          id: uniqueId++,
          firstName: role.firstName,
          middleName: role.middleName,
          lastName: role.lastName,
          associatedCompany: { name: role.associatedCompanyName, nzbn: role.associatedCompanyNzbn },
          nzbn: role.nzbn,
          physicalAddress: {
            addressLines: role.physicalAddress.addressLines,
            postCode: role.physicalAddress.postCode,
            countryCode: role.physicalAddress.countryCode,
          },
        })),
      ),
    );
  }

  public update(user: any): Observable<void> {
    return of(null);
  }
}

let uniqueId = 100;

export interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  associatedCompany: Company;
  nzbn: number;
  physicalAddress: Address;
}

export interface Company {
  name: string;
  nzbn: number;
}

export interface Address {
  addressLines: string[];
  postCode: string;
  countryCode: string;
}
