import { Component, OnInit } from '@angular/core';
import { CompanyEntityRole } from '@reusable-parts/nz-business-api';
import { Observable } from 'rxjs/Observable';
import { CopperPersonFacade } from '../facades/copper-person.facade';
import { Auth0Service } from '@reusable-parts/auth0';
import { environment } from '../../environments/environment';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public selectedPerson: CompanyEntityRole;
  public isUpdating$: Observable<boolean>;
  public updateError$: Observable<string>;
  public updateSucceed$: Observable<boolean>;

  constructor(private authService: Auth0Service, private personFacade: CopperPersonFacade) {}
  public ngOnInit(): void {
    this.isUpdating$ = this.personFacade.updating$;
    this.updateSucceed$ = this.personFacade.updateSucceeded$;
    this.updateError$ = this.personFacade.errorMessage$;
  }

  public personSelected(person: CompanyEntityRole): void {
    this.selectedPerson = person;
  }

  public update(): void {
    this.authService
      .getAppData<number>(environment.domain, 'copperId')
      .pipe(
        take(1),
        tap(copperId => this.personFacade.update(copperId, this.selectedPerson)),
      )
      .subscribe();
  }
}
