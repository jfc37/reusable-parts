import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/fuse';

@Component({
  selector: 'stateless-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() public logoUrl: string;
  @Input() public registerUrl: string;
  @Input() public forgotPasswordUrl: string;
  @Input() public disabled: boolean;
  @Input() public errorMessage: string = 'Password / Email combination incorrect';
  @Input() public titleTemplate: TemplateRef<any>;
  @Input() public descriptionTemplate: TemplateRef<any>;

  @Output() public loginClicked = new EventEmitter<LoginAttempt>();
  loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    this.handleDisabled();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].isFirstChange()) {
      this.handleDisabled();
    }
  }

  public login() {
    this.loginClicked.emit({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      rememberMe: this.loginForm.get('rememberMe').value,
    });
  }

  public handleDisabled(): void {
    if (this.disabled) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }
}

export interface LoginAttempt {
  email: string;
  password: string;
  rememberMe: boolean;
}
