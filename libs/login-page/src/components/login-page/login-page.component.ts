import { Component, OnInit, Inject } from '@angular/core';
import { LoginPageConfig, LOGIN_PAGE_CONFIG } from '../../../../../lib-config/login-page.config';
import { Store } from '@ngrx/store';
import { LoginState } from '@reusable-parts/login-page/src/+state/login.reducer';
import { ResetLoginPage, AttemptLogin } from '@reusable-parts/login-page/src/+state/login.actions';
import { Observable } from 'rxjs/Observable';
import { isLoggingInSelector } from '@reusable-parts/login-page/src/+state/login.selectors';

@Component({
  selector: 'jfc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public isLoggingIn$: Observable<boolean>;

  constructor(
    @Inject(LOGIN_PAGE_CONFIG) public config: LoginPageConfig,
    public store: Store<LoginState>,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new ResetLoginPage());

    this.isLoggingIn$ = this.store.select(isLoggingInSelector);
  }

  public loginAttempt({email, password}): void {
    this.store.dispatch(new AttemptLogin(email, password))
  }
}
