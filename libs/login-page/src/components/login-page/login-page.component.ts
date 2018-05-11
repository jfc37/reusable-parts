import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AttemptLogin, ResetLoginPage } from '@reusable-parts/login-page/src/+state/login.actions';
import { LoginState } from '@reusable-parts/login-page/src/+state/login.reducer';
import {
  hasLoggedInSelector,
  isLoggingInSelector,
  loginErrorMessageSelector,
} from '@reusable-parts/login-page/src/+state/login.selectors';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { LoginPageConfig } from '../../../../../lib-config/login-page.config';

@Component({
  selector: 'jfc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public isLoggingIn$: Observable<boolean>;
  public loginSucceeded$: Observable<boolean>;
  public loginError$: Observable<string>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    @Inject('loginPageConfig') public config: LoginPageConfig,
    public store: Store<LoginState>,
    public router: Router,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new ResetLoginPage());

    this.isLoggingIn$ = this.store.select(isLoggingInSelector);
    this.loginSucceeded$ = this.store.select(hasLoggedInSelector);
    this.loginError$ = this.store.select(loginErrorMessageSelector);

    this.loginSucceeded$
      .pipe(
        takeUntil(this.onDestroy$),
        filter(Boolean),
        distinctUntilChanged(),
        tap(() => this.router.navigate([this.config.afterLoginRoute])),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public loginAttempt({ email, password, rememberMe }): void {
    this.store.dispatch(new AttemptLogin(email, password, rememberMe));
  }
}
