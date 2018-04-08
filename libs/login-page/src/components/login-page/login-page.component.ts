import { Component, OnInit, Inject } from '@angular/core';
import { LOGIN_PAGE_CONFIG, LoginPageConfig } from '@reusable-parts/login-page/src/login-page.config';

@Component({
  selector: 'jfc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(@Inject(LOGIN_PAGE_CONFIG) public config: LoginPageConfig) { }

}
