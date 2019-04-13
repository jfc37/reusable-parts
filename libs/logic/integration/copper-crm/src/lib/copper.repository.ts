import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CopperPerson } from './copper.models';
import { COPPER_CRM_CONFIG, CopperCrmConfig } from './copper-crm.config';

@Injectable()
export class CopperRepository {
  constructor(@Inject(COPPER_CRM_CONFIG) private config: CopperCrmConfig, private http: HttpClient) {}
  public update(person: Partial<CopperPerson>): Observable<void> {
    return this.http.put(`${this.config.host}/copperPerson/`, person).pipe(map(() => null));
  }
}
