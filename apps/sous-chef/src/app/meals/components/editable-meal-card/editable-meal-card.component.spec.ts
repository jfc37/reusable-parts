import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableMealCardComponent } from './editable-meal-card.component';

describe('EditableMealCardComponent', () => {
  let component: EditableMealCardComponent;
  let fixture: ComponentFixture<EditableMealCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableMealCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableMealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
