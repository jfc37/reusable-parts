import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoginAttempt } from '@reusable-parts/login/src/components/login/login.component.model';

@Component({
  selector: 'jfc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
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
   * Emitted when user attempts to login with email and password
   */
  @Output() public loginAttempt = new EventEmitter<LoginAttempt>();

  public loginForm: FormGroup;

  public ngOnInit() {
    this.loginForm = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public displayError(field: string): boolean {
    const control = this.loginForm.get(field);
    return control && control.invalid && control.touched;
  }

  public login(): void {
    this.loginAttempt.emit({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    });
  }
}
