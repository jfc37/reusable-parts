import { Component, OnInit, Inject } from '@angular/core';
import { ForgotPasswordPageConfig } from '@reusable-parts/common-config/src/lib/environment/forgot-password-page.config';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store, select } from '@ngrx/store';
import { ResetState } from '@reusable-parts/forgot-password-page/src/lib/+state/reset.reducer';
import {
  AttemptReset,
  ResetForgotPasswordPage,
} from '@reusable-parts/forgot-password-page/src/lib/+state/reset.actions';
import {
  isResettingSelector,
  resetErrorMessageSelector,
  hasResetSelector,
} from '@reusable-parts/forgot-password-page/src/lib/+state/reset.selectors';
import { disabledSelector } from '@reusable-parts/forgot-password-page/src/lib/components/forgot-password-page/forgot-password-page.component.selectors';

@Component({
  selector: 'jfc-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  public disabled$: Observable<boolean>;
  public resetSucceeded$: Observable<boolean>;
  public resetError$: Observable<string>;

  constructor(
    @Inject('forgotPasswordPageConfig') public config: ForgotPasswordPageConfig,
    public store: Store<ResetState>,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new ResetForgotPasswordPage());

    this.disabled$ = this.store.pipe(select(disabledSelector));
    this.resetSucceeded$ = this.store.pipe(select(hasResetSelector));
    this.resetError$ = this.store.pipe(select(resetErrorMessageSelector));
  }

  public resetAttempt(email: string): void {
    this.store.dispatch(new AttemptReset(email));
  }
}
