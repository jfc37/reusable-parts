import { TestBed, async, inject } from '@angular/core/testing';

import { HasRoleGuard } from './has-role.guard';

describe('HasRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasRoleGuard]
    });
  });

  it('should ...', inject([HasRoleGuard], (guard: HasRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
