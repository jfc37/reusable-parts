import { async, TestBed } from '@angular/core/testing';
import { SearchCompaniesEntityModule } from './search-companies-entity.module';

describe('SearchCompaniesEntityModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchCompaniesEntityModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SearchCompaniesEntityModule).toBeDefined();
  });
});
