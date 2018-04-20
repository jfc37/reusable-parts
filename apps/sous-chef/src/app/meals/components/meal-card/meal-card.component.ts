import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, Optional, OnInit } from '@angular/core';
import { MealCardModel, IngredientModel } from './meal-card.component.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'jfc-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit, OnChanges {
  @Input() public model: MealCardModel;

  @Output() public deleteClicked = new EventEmitter();
  @Output() public expandClicked = new EventEmitter();
  @Output() public updateLink = new EventEmitter<string>();
  @Output() public updateIngredients = new EventEmitter<IngredientModel[]>();

  public linkFormControl: FormControl;
  public ingredientsFormArray: FormArray;

  public deleteButtonText = 'Delete';
  public updateButtonText = 'Save';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.model) {
      this.model = data.model;
    }
  }

  public ngOnInit() {
    this.linkFormControl = new FormControl(this.model.link, [Validators.required]);

    this.ingredientsFormArray = new FormArray(
      this.model.ingredients.map(i => new FormGroup({
        quantity: new FormControl(i.quantity, [Validators.required]),
        food: new FormControl(i.food, [Validators.required]),
      }))
    )
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.deleteButtonText = this.model.deleting ? 'Deleting...' : 'Delete';
    this.updateButtonText = this.model.updating ? 'Saving...' : 'Save';
  }

  public delete() {
    this.deleteClicked.emit();
  }

  public expand() {
    this.expandClicked.emit();
  }

  public submitLinkForm() {
    if (!this.isLinkSubmitDisabled()) {
      this.updateLink.emit(this.linkFormControl.value)
    }
  }

  public submitIngredientsForm() {
    if (!this.isIngredientsSubmitDisabled()) {
      this.updateIngredients.emit(this.ingredientsFormArray.value)
    }
  }

  public isLinkSubmitDisabled(): boolean {
    return this.linkFormControl.invalid || this.model.updating;
  }

  public isIngredientsSubmitDisabled(): boolean {
    return this.ingredientsFormArray.invalid || this.model.updating;
  }

  public displayError(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  public addIngredient(): void {
    this.ingredientsFormArray.push(new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      food: new FormControl('', [Validators.required]),
    }));
  }

  public removeIngredient(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }
}
