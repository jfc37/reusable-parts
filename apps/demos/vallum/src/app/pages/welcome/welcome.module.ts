import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { HeroTextModule } from '@reusable-parts/stateless/components/hero-text';
import { MatButtonModule } from '@angular/material';

const routes: Route[] = [
  {
    component: WelcomeComponent,
    path: '',
  },
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, PageModule, HeroTextModule],
})
export class WelcomeModule {}
