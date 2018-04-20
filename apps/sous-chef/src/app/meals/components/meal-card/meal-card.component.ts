import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, Optional } from '@angular/core';
import { MealCardModel } from './meal-card.component.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'jfc-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnChanges {
  @Input() public model: MealCardModel;

  @Output() public deleteClicked = new EventEmitter();
  @Output() public expandClicked = new EventEmitter();

  public deleteButtonText = 'Delete';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.model) {
      this.model = data.model;
    }
  }

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

  public expand() {
    this.expandClicked.emit();
  }
}
