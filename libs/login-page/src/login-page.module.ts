import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from '@reusable-parts/login';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  imports: [
    LoginModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LoginPageComponent}
    ])
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
