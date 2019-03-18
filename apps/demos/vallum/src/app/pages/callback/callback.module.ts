import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CallbackComponent } from './callback.component';

const routes: Route[] = [
  {
    component: CallbackComponent,
    path: '',
  },
];

@NgModule({
  declarations: [CallbackComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CallbackModule {}
