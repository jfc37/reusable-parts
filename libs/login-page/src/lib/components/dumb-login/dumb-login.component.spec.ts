import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseIfOnDomDirective } from '@reusable-parts/fuse/src/lib/@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { getElement } from '../../../../../unit-test-utils/html-queries';
import { LoginComponent } from './dumb-login.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FuseModule, FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [LoginComponent, FuseIfOnDomDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.name = 'Boom shop';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`Welcome message`, () => {
    it(`should display welcome message`, done => {
      fixture.whenStable().then(() => {
        const titleEl = getElement(fixture.debugElement, 'title');
        expect(titleEl).toBeTruthy();
        done();
      });
    });
  });

  describe('Description', () => {
    it(`should display description when one is set`, done => {
      component.description = 'A wonder app';

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const titleEl = getElement(fixture.debugElement, 'description');
        expect(titleEl).toBeTruthy();
        done();
      });
    });

    it(`should not display description when there is none`, done => {
      component.description = null;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const titleEl = getElement(fixture.debugElement, 'description');
        expect(titleEl).toBeFalsy();
        done();
      });
    });
  });

  xdescribe(`Email`, () => {
    it(`should display required validation message`, () => {
      const el = getElement(fixture.debugElement, 'email-required-validation');
      expect(el).toBeTruthy();
    });
  });
});
