import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { CompaniesService, CompanyEntityRole } from '@reusable-parts/nz-business-api';
import { SearchCompaniesFacade } from '../facades/search-companies.facade';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search-companies-entity',
  templateUrl: './search-companies-entity.component.html',
  styleUrls: ['./search-companies-entity.component.css'],
})
export class SearchCompaniesEntityComponent implements OnInit {
  constructor(private facade: SearchCompaniesFacade) {}
  @Output() public entitySelected = new EventEmitter<CompanyEntityRole>();
  public results$: Observable<CompanyEntityRole[]>;
  public isSearching$: Observable<boolean>;
  public errorMessage$: Observable<string>;
  public searchFormControl = new FormControl(null, [Validators.required, Validators.minLength(2)]);
  public ngOnInit(): void {
    this.results$ = this.facade.results$;
    this.isSearching$ = this.facade.loading$;
    this.errorMessage$ = this.facade.errorMessage$;
  }

  public search(): void {
    this.facade.search(this.searchFormControl.value);
  }

  public selected(entity: CompanyEntityRole): void {
    return this.entitySelected.emit(entity);
  }
}
