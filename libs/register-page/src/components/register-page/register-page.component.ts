import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AttemptRegister, ResetRegisterPage } from '@reusable-parts/register-page/src/+state/register.actions';
import { RegisterState } from '@reusable-parts/register-page/src/+state/register.reducer';
import { RegisterPageConfig } from '../../../../../lib-config/register-page.config';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {
  isRegisteringSelector,
  hasRegisteredSelector,
  registerErrorMessageSelector,
} from '@reusable-parts/register-page/src/+state/register.selectors';
import { takeUntil, filter, distinctUntilChanged, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'jfc-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public registering$: Observable<boolean>;
  public registrationSucceeded$: Observable<boolean>;
  public registrationError$: Observable<string>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    @Inject('registerPageConfig') public config: RegisterPageConfig,
    public store: Store<RegisterState>,
    public router: Router,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new ResetRegisterPage());

    this.registering$ = this.store.select(isRegisteringSelector);
    this.registrationSucceeded$ = this.store.select(hasRegisteredSelector);
    this.registrationError$ = this.store.select(registerErrorMessageSelector);

    this.registrationSucceeded$
      .pipe(
        takeUntil(this.onDestroy$),
        filter(Boolean),
        distinctUntilChanged(),
        tap(() => this.router.navigate([this.config.afterRegistrationRoute])),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public registrationAttempt({ name, email, password }): void {
    this.store.dispatch(new AttemptRegister(name, email, password));
  }
}
