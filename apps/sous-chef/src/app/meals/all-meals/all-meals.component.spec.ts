import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMealsComponent } from './all-meals.component';

describe('AllMealsComponent', () => {
  let component: AllMealsComponent;
  let fixture: ComponentFixture<AllMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
