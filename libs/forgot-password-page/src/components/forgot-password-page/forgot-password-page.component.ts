import { Component, OnInit, Inject } from '@angular/core';
import { ForgotPasswordPageConfig } from '@reusable-parts/common-config/src/environment/forgot-password-page.config';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'jfc-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  public disabled$: Observable<boolean>;
  public resetSucceeded$: Observable<boolean>;
  public resetError$: Observable<boolean>;

  constructor(@Inject('forgotPasswordPageConfig') public config: ForgotPasswordPageConfig) {}

  public ngOnInit(): void {
    this.disabled$ = of(false);
    this.resetSucceeded$ = of(false);
    this.resetError$ = of(null);
  }

  public resetAttempt(email: string): void {
    console.error('xxx', email);
  }
}
