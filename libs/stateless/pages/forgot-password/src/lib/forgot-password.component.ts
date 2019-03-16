import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/fuse';

@Component({
  selector: 'stateless-forgot-password-page',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ForgotPasswordComponent implements OnInit, OnChanges {
  @Input() public logoUrl: string;
  @Input() public titleTemplate: TemplateRef<any>;
  @Input() public descriptionTemplate: TemplateRef<any>;
  @Input() public loginUrl: string;
  @Input() public disabled: boolean;
  @Input() public errorMessage: string;

  @Output() public resetClicked = new EventEmitter<string>();

  forgotPasswordForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.handleDisabled();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].isFirstChange()) {
      this.handleDisabled();
    }
  }

  public handleDisabled(): void {
    if (this.disabled) {
      this.forgotPasswordForm.disable();
    } else {
      this.forgotPasswordForm.enable();
    }
  }

  public reset() {
    this.resetClicked.emit(this.forgotPasswordForm.get('email').value);
  }
}
