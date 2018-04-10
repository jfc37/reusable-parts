import { Component, OnInit, Inject } from '@angular/core';
import { REGISTER_PAGE_CONFIG, RegisterPageConfig } from '../../../../../lib-config/register-page.config';

@Component({
  selector: 'jfc-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    @Inject(REGISTER_PAGE_CONFIG) public config: RegisterPageConfig,
  ) { }

  ngOnInit() {
  }

}
