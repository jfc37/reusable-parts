import { Component, OnInit, Inject } from '@angular/core';
import { RegisterPageConfig } from '../../../../../lib-config/register-page.config';

@Component({
  selector: 'jfc-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    @Inject('registerPageConfig') public config: RegisterPageConfig,
  ) { }

  ngOnInit() {
  }

}
