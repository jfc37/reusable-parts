import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AttemptRegister } from '@reusable-parts/register-page/src/+state/register.actions';
import { RegisterState } from '@reusable-parts/register-page/src/+state/register.reducer';
import { RegisterPageConfig } from '../../../../../lib-config/register-page.config';

@Component({
  selector: 'jfc-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(
    @Inject('registerPageConfig') public config: RegisterPageConfig,
    public store: Store<RegisterState>,
  ) { }

  public registrationAttempt({ email, password }): void {
    this.store.dispatch(new AttemptRegister(null, email, password));
  }

}
