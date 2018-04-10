import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LoginPageConfig, LOGIN_PAGE_CONFIG } from '../../../../../lib-config/login-page.config';
import { Store } from '@ngrx/store';
import { LoginState } from '@reusable-parts/login-page/src/+state/login.reducer';
import { ResetLoginPage, AttemptLogin } from '@reusable-parts/login-page/src/+state/login.actions';
import { Observable } from 'rxjs/Observable';
import { isLoggingInSelector, loginErrorMessageSelector, hasLoggedInSelector } from '@reusable-parts/login-page/src/+state/login.selectors';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil, filter, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'jfc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public isLoggingIn$: Observable<boolean>;
  public loginSucceeded$: Observable<boolean>;
  public loginError$: Observable<string>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    @Inject(LOGIN_PAGE_CONFIG) public config: LoginPageConfig,
    public store: Store<LoginState>,
    public router: Router,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new ResetLoginPage());

    this.isLoggingIn$ = this.store.select(isLoggingInSelector);
    this.loginSucceeded$ = this.store.select(hasLoggedInSelector);
    this.loginError$ = this.store.select(loginErrorMessageSelector);

    this.loginSucceeded$.pipe(
      takeUntil(this.onDestroy$),
      filter(Boolean),
      distinctUntilChanged(),
      tap(() => this.router.navigate([this.config.redirectAfterLogin]))
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public loginAttempt({ email, password }): void {
    this.store.dispatch(new AttemptLogin(email, password))
  }
}
