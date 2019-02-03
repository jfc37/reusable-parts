import { async, TestBed } from '@angular/core/testing';
import { ChatComponentsModule } from './chat-components.module';

describe('ChatComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChatComponentsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ChatComponentsModule).toBeDefined();
  });
});
