import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompaniesRepository } from '@reusable-parts/logic/integration/nz-business';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { CopperPerson, CopperRepository } from '@reusable-parts/logic/integration/copper-crm';
import { Auth0Service } from '@reusable-parts/logic/integration/auth0/src';
import { environment } from 'apps/demos/vallum/src/environments/environment';

@Injectable()
export class UserSearchService {
  constructor(
    private companiesRepository: CompaniesRepository,
    private copperRepository: CopperRepository,
    private authService: Auth0Service,
  ) {}

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

  public update(user: User): Observable<void> {
    const copperUser: Partial<CopperPerson> = {
      first_name: user.firstName,
      middle_name: user.middleName,
      last_name: user.lastName,
      company_name: user.associatedCompany.name,
      address: {
        country: user.physicalAddress.countryCode,
        postal_code: user.physicalAddress.postCode,
        street: user.physicalAddress.addressLines[0],
        city: user.physicalAddress.addressLines[1],
        state: user.physicalAddress.addressLines[2],
      },
    };

    return this.authService.getAppData<number>(environment.domain, 'copperId').pipe(
      map(copperId => ({
        ...copperUser,
        id: copperId,
      })),
      switchMap(copper => this.copperRepository.update(copper)),
      mapTo(null),
    );
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
