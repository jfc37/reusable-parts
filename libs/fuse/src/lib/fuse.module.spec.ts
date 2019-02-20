import { async, TestBed } from '@angular/core/testing';
import { FuseModule } from './fuse.module';

describe('FuseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FuseModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FuseModule).toBeDefined();
  });
});
