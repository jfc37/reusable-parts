import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  config: LoginPageConfig;

  constructor() {
    this.config = {
      name: `Bob Barber's Building Supplies`,
      description: `For all the supplies you need to get resource consent`,
    }
  }

  ngOnInit() {
  }

}

export interface LoginPageConfig {
  name: string;
  description: string;
}
