import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';

@Component({
  selector: 'jfc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: fuseAnimations
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
