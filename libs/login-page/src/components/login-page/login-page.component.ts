import { Component, OnInit, Inject } from '@angular/core';
import { LoginPageConfig, LOGIN_PAGE_CONFIG } from '../../../../../lib-config/login-page.config';

@Component({
  selector: 'jfc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(@Inject(LOGIN_PAGE_CONFIG) public config: LoginPageConfig) {
    console.error('xxx CONFIG', config);
   }

}
