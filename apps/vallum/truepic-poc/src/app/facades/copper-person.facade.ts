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

  public update(person: CompanyEntityRole): void {
    if (!person) {
      return;
    }

    this.updating$.next(true);
    this.clearPreviousAttempt();

    this.api
      .update(companyEntityToCopperPerson(person))
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

  private clearPreviousAttempt() {
    this.updateSucceeded$.next(null);
    this.errorMessage$.next(null);
  }
}

function companyEntityToCopperPerson(entity: CompanyEntityRole): Partial<CopperPerson> {
  return {
    name: entity.name,
    address: {
      street: entity.physicalAddress.addressLines[0],
      postal_code: entity.physicalAddress.postCode,
    } as CopperAddress,
  };
}
