import { Component, OnInit, Inject } from '@angular/core';
import { LoginPageConfig, LOGIN_PAGE_CONFIG } from '../../../../../lib-config/login-page.config';
import { Store } from '@ngrx/store';
import { LoginState } from '@reusable-parts/login-page/src/+state/login.reducer';
import { ResetLoginPage, AttemptLogin } from '@reusable-parts/login-page/src/+state/login.actions';
import { Observable } from 'rxjs/Observable';
import { isLoggingInSelector, loginErrorMessageSelector, hasLoggedInSelector } from '@reusable-parts/login-page/src/+state/login.selectors';

@Component({
  selector: 'jfc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public isLoggingIn$: Observable<boolean>;
  public loginSucceeded$: Observable<boolean>;
  public loginError$: Observable<string>;

  constructor(
    @Inject(LOGIN_PAGE_CONFIG) public config: LoginPageConfig,
    public store: Store<LoginState>,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new ResetLoginPage());

    this.isLoggingIn$ = this.store.select(isLoggingInSelector);
    this.loginSucceeded$ = this.store.select(hasLoggedInSelector);
    this.loginError$ = this.store.select(loginErrorMessageSelector);
  }

  public loginAttempt({ email, password }): void {
    this.store.dispatch(new AttemptLogin(email, password))
  }
}
