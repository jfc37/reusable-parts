import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-search-companies-entity',
  templateUrl: './search-companies-entity.component.html',
  styleUrls: ['./search-companies-entity.component.css'],
})
export class SearchCompaniesEntityComponent {
  @Output() public entitySelected = new EventEmitter<CompaniesEntity>();
  public results$ = new ReplaySubject<CompaniesEntity[]>();
  public isSearching$ = new ReplaySubject<boolean>();
  public searchFormControl = new FormControl(null, [Validators.required, Validators.minLength(2)]);

  public search(): void {
    this.results$.next([
      {
        name: this.searchFormControl.value,
        nzbn: 'ABC123',
        entityNumber: 133552,
      },
    ]);
  }

  public selected(entity: CompaniesEntity): void {
    return this.entitySelected.emit(entity);
  }
}

export interface CompaniesEntity {
  name: string;
  nzbn: string;
  entityNumber: number;
}
