import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserSearchService {
  public search(name: string): Observable<User[]> {
    return of([
      {
        firstName: name,
        middleName: name,
        lastName: name,
        associatedCompany: { name: 'BNZ', nzbn: 65475 },
        nzbn: 8763,
        physicalAddress: {
          addressLines: ['7C /', '10 Lorne Street', 'Te Aro'],
          postCode: '6010',
          countryCode: 'NZL',
        },
      },
    ]);
  }

  public update(user: any): Observable<void> {
    return of(null);
  }
}

export interface User {
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
