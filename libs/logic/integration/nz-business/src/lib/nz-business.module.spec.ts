import { async, TestBed } from '@angular/core/testing';
import { NzBusinessModule } from './nz-business.module';

describe('NzBusinessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzBusinessModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NzBusinessModule).toBeDefined();
  });
});
