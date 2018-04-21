import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingInstructionsComponent } from './cooking-instructions.component';

describe('CookingInstructionsComponent', () => {
  let component: CookingInstructionsComponent;
  let fixture: ComponentFixture<CookingInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookingInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
