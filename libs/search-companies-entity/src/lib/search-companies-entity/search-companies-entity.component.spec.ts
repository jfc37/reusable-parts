import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompaniesEntityComponent } from './search-companies-entity.component';

describe('SearchCompaniesEntityComponent', () => {
  let component: SearchCompaniesEntityComponent;
  let fixture: ComponentFixture<SearchCompaniesEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompaniesEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCompaniesEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
