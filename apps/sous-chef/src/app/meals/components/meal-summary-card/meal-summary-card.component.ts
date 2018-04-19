import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MealSummaryCardModel } from './meal-summary-card.component.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jfc-meal-summary-card',
  templateUrl: './meal-summary-card.component.html',
  styleUrls: ['./meal-summary-card.component.scss']
})
export class MealSummaryCardComponent {
  @Input() public model: MealSummaryCardModel;

  @Output() public deleteClicked = new EventEmitter();

  public delete() {
    this.deleteClicked.emit();
  }
}
