import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@reusable-parts/fuse';

@Component({
  selector: 'stateless-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class RegisterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public logoUrl: string;
  @Input() public titleTemplate: TemplateRef<any>;
  @Input() public descriptionTemplate: TemplateRef<any>;
  @Input() public loginUrl: string;
  @Input() public termsUrl: string;
  @Input() public captureName: boolean;
  @Input() public disabled: boolean;
  @Input() public errorMessage: string;

  @Output() public registerClicked = new EventEmitter<RegisterAttempt>();

  registerForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this._unsubscribeAll = new Subject();

    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      acceptTerms: [false, Validators.requiredTrue],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm
      .get('password')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });

    this.handleDisabled();
    this.handleTermsUrl();
    this.handleCaptureName();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].isFirstChange()) {
      this.handleDisabled();
    }

    if (changes['termsUrl'] && !changes['termsUrl'].isFirstChange()) {
      this.handleTermsUrl();
    }

    if (changes['captureName'] && !changes['captureName'].isFirstChange()) {
      this.handleCaptureName();
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public handleDisabled(): void {
    if (this.disabled) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
  }

  public handleTermsUrl(): void {
    const termsControl = this.registerForm.get('acceptTerms');
    if (this.termsUrl) {
      termsControl.setValidators(Validators.requiredTrue);
    } else {
      termsControl.clearValidators();
    }
  }

  public handleCaptureName(): void {
    const nameControl = this.registerForm.get('name');
    if (this.captureName) {
      nameControl.setValidators(Validators.required);
    } else {
      nameControl.clearValidators();
    }
  }

  public register() {
    this.registerClicked.emit({
      name: this.captureName ? this.registerForm.get('name').value : undefined,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      acceptTerms: this.termsUrl ? this.registerForm.get('acceptTerms').value : undefined,
    });
  }
}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};

export interface RegisterAttempt {
  name?: string;
  email: string;
  password: string;
  acceptTerms?: boolean;
}
