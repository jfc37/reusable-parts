import { async, TestBed } from '@angular/core/testing';
import { StatelessWelcomeModule } from './stateless-welcome.module';

describe('StatelessWelcomeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StatelessWelcomeModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StatelessWelcomeModule).toBeDefined();
  });
});
