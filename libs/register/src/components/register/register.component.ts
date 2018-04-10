import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';

@Component({
  selector: 'jfc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: fuseAnimations
})
export class RegisterComponent implements OnInit {
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

  public registerForm: FormGroup;

  public ngOnInit() {
    this.registerForm = new FormBuilder().group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPassword]]
    });
  }

  public displayError(field: string): boolean {
    const control = this.registerForm.get(field);
    return control && control.invalid && control.touched;
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
      passwordsNotMatch: true
    };
  }
}
