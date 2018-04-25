import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineWarningComponent } from './offline-warning.component';

describe('OfflineWarningComponent', () => {
  let component: OfflineWarningComponent;
  let fixture: ComponentFixture<OfflineWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
