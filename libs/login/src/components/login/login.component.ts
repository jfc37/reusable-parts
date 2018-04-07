import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'jfc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
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

  public loginForm: FormGroup;

  private onDestroy = new ReplaySubject();

  ngOnInit() {
    this.loginForm = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  displayError(field: string): boolean {
    const control = this.loginForm.get(field);
    return control && control.invalid && control.touched;
  }
}
