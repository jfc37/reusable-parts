import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbTopNavComponent } from './dumb-top-nav.component';

describe('DumbTopNavComponent', () => {
  let component: DumbTopNavComponent;
  let fixture: ComponentFixture<DumbTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
