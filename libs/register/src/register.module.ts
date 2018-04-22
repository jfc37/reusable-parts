import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { WelcomeModule } from '@reusable-parts/welcome';

@NgModule({
  imports: [
    CommonModule,

    WelcomeModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: RegisterModule
  ) {
    if (parentModule) {
      throw new Error(
        'RegisterModule is already loaded. Import it in the AppModule only!'
      );
    }
  }
}
