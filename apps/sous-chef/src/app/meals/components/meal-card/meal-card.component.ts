import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MealCardModel } from './meal-card.component.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jfc-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnChanges {
  @Input() public model: MealCardModel;

  @Output() public deleteClicked = new EventEmitter();

  public deleteButtonText = 'Delete';

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.model.deleting) {
      this.deleteButtonText = 'Deleting...'
    } else {
      this.deleteButtonText = 'Delete';
    }
  }

  public delete() {
    this.deleteClicked.emit();
  }
}
