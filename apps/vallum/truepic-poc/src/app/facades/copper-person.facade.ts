import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';
import { delay, tap, catchError, finalize } from 'rxjs/operators';
import { CompanyEntityRole } from '@reusable-parts/nz-business-api';
import { CopperPeopleService, CopperPerson, CopperAddress } from '@reusable-parts/copper-crm';

@Injectable({
  providedIn: 'root',
})
export class CopperPersonFacade {
  constructor(private api: CopperPeopleService) {}
  public updating$ = new ReplaySubject<boolean>();
  public updateSucceeded$ = new ReplaySubject<any>();
  public errorMessage$ = new ReplaySubject<string>();

  public update(copperId: number, person: CompanyEntityRole): void {
    if (!person) {
      return;
    }

    this.updating$.next(true);
    this.reset();

    this.api
      .update(companyEntityToCopperPerson(copperId, person))
      .pipe(
        tap(() => this.updateSucceeded$.next(true)),
        catchError(err => {
          console.error('ERROR', err);
          this.errorMessage$.next('Problem updating your details');
          return of(null);
        }),
        finalize(() => this.updating$.next(false)),
      )
      .subscribe();
  }

  public reset(): void {
    this.updateSucceeded$.next(null);
    this.errorMessage$.next(null);
  }
}

function companyEntityToCopperPerson(id: number, entity: CompanyEntityRole): Partial<CopperPerson> {
  return {
    id,
    first_name: entity.firstName,
    middle_name: entity.middleName,
    last_name: entity.lastName,
    company_name: entity.associatedCompanyName,
    address: {
      street: entity.physicalAddress.addressLines.join(', '),
      postal_code: entity.physicalAddress.postCode,
      country: entity.physicalAddress.countryCode,
    } as CopperAddress,
  };
}
