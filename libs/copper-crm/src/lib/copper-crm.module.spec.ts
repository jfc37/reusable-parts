import { async, TestBed } from '@angular/core/testing';
import { CopperCrmModule } from './copper-crm.module';

describe('CopperCrmModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CopperCrmModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CopperCrmModule).toBeDefined();
  });
});
