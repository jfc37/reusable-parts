import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { RegisterModule } from '@reusable-parts/register';

@NgModule({
  imports: [
    CommonModule,

    RegisterModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: RegisterPageComponent}
    ])
  ],
  declarations: [RegisterPageComponent]
})
export class RegisterPageModule {
  constructor(@Optional() @SkipSelf() parentModule: RegisterPageModule)
  {
      if ( parentModule )
      {
          throw new Error('RegisterPageModule is already loaded. Import it in the AppModule only!');
      }
  }
}
