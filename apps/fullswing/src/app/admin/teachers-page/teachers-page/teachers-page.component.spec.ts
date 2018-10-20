import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPageComponent } from './teachers-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TeachersPageComponent', () => {
  let component: TeachersPageComponent;
  let fixture: ComponentFixture<TeachersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TeachersPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
