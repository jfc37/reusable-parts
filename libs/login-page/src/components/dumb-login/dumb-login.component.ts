import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';
import { LoginAttempt } from './dumb-login.component.model';

@Component({
  selector: 'jfc-dumb-login',
  templateUrl: './dumb-login.component.html',
  styleUrls: ['./dumb-login.component.scss'],
  animations: fuseAnimations,
})
export class DumbLoginComponent implements OnInit, OnChanges {
  /**
   * Name of the website
   * Included in the welcome message
   */
  @Input() public name: string;

  /**
   * Description of the website
   * Displayed to the user if provided
   */
  @Input() public description: string;

  /**
   * Logo url
   */
  @Input() public logoUrl: string;

  /**
   * Is logging in currently occuring?
   */
  @Input() public loggingIn: boolean;

  /**
   * Did login succeed?
   */
  @Input() public loginSucceeded: boolean;

  /**
   * Error message to display as a result of login failure
   */
  @Input() public loginError: string;

  /**
   * Route for account registration
   */
  @Input() public registerRoute: string;

  /**
   * Route for forgot password
   */
  @Input() public forgotPasswordRoute: string;

  /**
   * Emitted when user attempts to login with email and password
   */
  @Output() public loginAttempt = new EventEmitter<LoginAttempt>();

  public loginForm: FormGroup;

  public ngOnInit() {
    this.loginForm = new FormBuilder().group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });

    this.updateFormState();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggingIn'] && !changes['loggingIn'].isFirstChange()) {
      this.updateFormState();
    }
  }

  private updateFormState() {
    if (this.loggingIn) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  public displayError(field: string): boolean {
    const control = this.loginForm.get(field);
    return control && control.invalid && control.touched;
  }

  public login(): void {
    this.loginAttempt.emit({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      rememberMe: this.loginForm.get('rememberMe').value,
    });
  }
}
