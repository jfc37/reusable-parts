import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';
import { delay, tap, map, catchError, take, finalize } from 'rxjs/operators';
import { CompanyEntity } from '../models/company-entity.model';
import { CompaniesService } from '@reusable-parts/nz-business-api';
import { CompaniesEntityRoleResponse } from '@reusable-parts/nz-business-api/src/lib/models/companies-entity-role-response';

@Injectable({
  providedIn: 'root',
})
export class SearchCompaniesFacade {
  public loading$ = new ReplaySubject<boolean>();
  public results$ = new ReplaySubject<CompanyEntity[]>();
  public errorMessage$ = new ReplaySubject<string>();

  constructor(private api: CompaniesService) {}

  public search(name: string): void {
    if (!name) {
      return;
    }

    this.loading$.next(true);
    this.clearPreviousAttempt();

    this.api
      .CompaniesEntityRoleSearch({ name })
      .pipe(
        take(1),
        map(responseToCompanyEntities),
        tap(entities => this.results$.next(entities)),
        catchError(err => {
          console.error('API failed', err);
          this.errorMessage$.next('Company register unavailable, please try again later');

          return of(null);
        }),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe();
  }

  private clearPreviousAttempt() {
    this.results$.next(null);
    this.errorMessage$.next(null);
  }
}

function responseToCompanyEntities(response: CompaniesEntityRoleResponse): CompanyEntity[] {
  return response.roles.map(
    role =>
      ({
        entityNumber: role.entityNumber,
        name: role.name,
        nzbn: role.nzbn,
      } as CompanyEntity),
  );
}
