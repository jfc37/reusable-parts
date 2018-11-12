import { async, TestBed } from '@angular/core/testing';
import { LibnameModule } from './libname.module';

describe('LibnameModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LibnameModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LibnameModule).toBeDefined();
  });
});
