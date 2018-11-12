import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';

@Component({
  selector: 'jfc-dumb-forgot-password',
  templateUrl: './dumb-forgot-password.component.html',
  styleUrls: ['./dumb-forgot-password.component.scss'],
  animations: fuseAnimations,
})
export class DumbForgotPasswordComponent implements OnInit, OnChanges {
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
   * Route of login
   */
  @Input()
  public loginRoute: string;

  /**
   * Should form be disabled?
   */
  @Input()
  public disabled: boolean;

  /**
   * Did reset succeed?
   */
  @Input()
  public resetSucceeded: boolean;

  /**
   * Error message to display as a result of reset failure
   */
  @Input()
  public resetError: string;

  /**
   * Emitted when user attempts to reset with email address
   */
  @Output()
  public resetAttempt = new EventEmitter<string>();

  public form: FormGroup;

  public ngOnInit() {
    this.form = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.updateFormState();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].isFirstChange()) {
      this.updateFormState();
    }
  }

  public displayError(field: string): boolean {
    const control = this.form.get(field);
    return control && control.invalid && control.touched;
  }

  public reset(): void {
    this.resetAttempt.emit(this.form.get('email').value);
  }

  private updateFormState() {
    if (this.disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
