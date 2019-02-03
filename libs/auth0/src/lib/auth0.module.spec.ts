import { async, TestBed } from '@angular/core/testing';
import { Auth0Module } from './auth0.module';

describe('Auth0Module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Auth0Module],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(Auth0Module).toBeDefined();
  });
});
