import { Injectable, Inject } from '@angular/core';
import { CompaniesEntityRoleRequest } from '../models/companies-entity-role-request';
import { CompaniesEntityRoleResponse } from '../models/companies-entity-role-response';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzBusinessApiConfig, NZ_BUSINESS_API_CONFIG } from '../nz-business-api.config';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(@Inject(NZ_BUSINESS_API_CONFIG) private config: NzBusinessApiConfig, private http: HttpClient) {}

  /**
   * Companies-Entity-Role-Search
   * https://api.business.govt.nz/api/apis/info?name=Companies-Entity-Role-Search&version=v2&provider=mbiecreator
   */
  public CompaniesEntityRoleSearch(request: CompaniesEntityRoleRequest): Observable<CompaniesEntityRoleResponse> {
    return this.http.get<CompaniesEntityRoleResponse>(
      `${this.config.host}/services/v2/companies-office/entity-roles/search?page=0&page-size=10&name=${
        request.name
      }&registered-only=false&role-type=DIR`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.config.accessToken}`)
          .set('Accept', 'application/json'),
      },
    );
  }
}
