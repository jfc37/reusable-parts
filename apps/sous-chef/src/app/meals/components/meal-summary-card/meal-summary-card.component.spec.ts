import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSummaryCardComponent } from './meal-summary-card.component';

describe('MealSummaryCardComponent', () => {
  let component: MealSummaryCardComponent;
  let fixture: ComponentFixture<MealSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
