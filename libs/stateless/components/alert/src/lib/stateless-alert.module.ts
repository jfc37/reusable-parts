import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatelessAlertComponent } from './alert/alert.component';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MatIconModule, FlexLayoutModule],
  declarations: [StatelessAlertComponent],
  exports: [StatelessAlertComponent],
})
export class StatelessAlertModule {}
