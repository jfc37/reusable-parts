import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroTextComponent } from './hero-text.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [HeroTextComponent],
  exports: [HeroTextComponent],
})
export class HeroTextModule {}
