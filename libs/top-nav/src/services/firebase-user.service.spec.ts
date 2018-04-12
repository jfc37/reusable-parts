import { TestBed, inject } from '@angular/core/testing';

import { FirebaseUserService } from './firebase-user.service';

describe('FirebaseUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseUserService]
    });
  });

  it('should be created', inject([FirebaseUserService], (service: FirebaseUserService) => {
    expect(service).toBeTruthy();
  }));
});
