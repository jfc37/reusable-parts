import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const routes: Route[] = [
  {
    component: WelcomeComponent,
    path: '',
  },
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WelcomeModule {}
