import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MealSummaryCardModel } from './meal-summary-card.component.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jfc-meal-summary-card',
  templateUrl: './meal-summary-card.component.html',
  styleUrls: ['./meal-summary-card.component.scss']
})
export class MealSummaryCardComponent implements OnChanges {
  @Input() public model: MealSummaryCardModel;

  @Output() public deleteClicked = new EventEmitter();

  public deleteButtonText = 'DELETE';

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.model.deleting) {
      this.deleteButtonText = 'DELETING...'
    } else {
      this.deleteButtonText = 'DELETE';
    }
  }

  public delete() {
    this.deleteClicked.emit();
  }
}
