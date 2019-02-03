import { async, TestBed } from '@angular/core/testing';
import { NzBusinessApiModule } from './nz-business-api.module';

describe('NzBusinessApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzBusinessApiModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NzBusinessApiModule).toBeDefined();
  });
});
