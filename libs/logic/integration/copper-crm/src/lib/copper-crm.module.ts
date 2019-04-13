import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopperRepository } from './copper.repository';

@NgModule({
  imports: [CommonModule],
  providers: [CopperRepository],
})
export class CopperCrmModule {}
