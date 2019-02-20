import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/fuse/src/lib/@fuse/animations';
import { RegistrationAttempt } from './dumb-register.component.model';

@Component({
  selector: 'jfc-dumb-register',
  templateUrl: './dumb-register.component.html',
  styleUrls: ['./dumb-register.component.scss'],
  animations: fuseAnimations,
})
export class DumbRegisterComponent implements OnInit, OnChanges {
  /**
   * Name of the website
   * Included in the welcome message
   */
  @Input()
  public name: string;

  /**
   * Description of the website
   * Displayed to the user if provided
   */
  @Input()
  public description: string;

  /**
   * Logo url
   */
  @Input()
  public logoUrl: string;

  /**
   * Is currently registering?
   */
  @Input()
  public registering: boolean;

  /**
   * Did registration succeed?
   */
  @Input()
  public registrationSucceeded: boolean;

  /**
   * Error message to display as a result of registration failure
   */
  @Input()
  public registrationError: string;

  /**
   * Route for logging in
   */
  @Input()
  public loginRoute: string;

  /**
   * Emitted when user attempts to register with email and password
   */
  @Output()
  public registrationAttempt = new EventEmitter<RegistrationAttempt>();

  public registerForm: FormGroup;

  public ngOnInit() {
    this.registerForm = new FormBuilder().group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPassword]],
    });

    this.updateFormState();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['registering'] && !changes['registering'].isFirstChange()) {
      this.updateFormState();
    }
  }

  public displayError(field: string): boolean {
    const control = this.registerForm.get(field);
    return control && control.invalid && control.touched;
  }

  public register(): void {
    const firstName = this.registerForm.get('firstName').value;
    const surname = this.registerForm.get('surname').value;
    this.registrationAttempt.emit({
      name: [firstName, surname].join(' '),
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    });
  }

  public canRegister() {
    return this.registerForm.invalid || this.registering || this.registrationSucceeded;
  }

  private updateFormState() {
    if (this.registering) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
  }
}

function confirmPassword(control: AbstractControl) {
  if (!control.parent || !control) {
    return;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return;
  }

  if (passwordConfirm.value === '') {
    return;
  }

  if (password.value !== passwordConfirm.value) {
    return {
      passwordsNotMatch: true,
    };
  }
}
