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
  @Output() public updatePreparations = new EventEmitter<string[]>();
  @Output() public updateCookingSteps = new EventEmitter<string[]>();

  public linkFormControl: FormControl;
  public ingredientsFormArray: FormArray;
  public preparationsFormArray: FormArray;
  public cookingStepsFormArray: FormArray;

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
    );

    this.preparationsFormArray = new FormArray(
      this.model.preparationSteps.map(i => new FormControl(i, [Validators.required]))
    );

    this.cookingStepsFormArray = new FormArray(
      this.model.cookingSteps.map(i => new FormControl(i, [Validators.required]))
    );
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

  public submitPreparationsForm() {
    if (!this.isPreparationsSubmitDisabled()) {
      this.updatePreparations.emit(this.preparationsFormArray.value)
    }
  }

  public submitCookingStepsForm() {
    if (!this.isCookingStepsSubmitDisabled()) {
      this.updateCookingSteps.emit(this.cookingStepsFormArray.value)
    }
  }

  public isLinkSubmitDisabled(): boolean {
    return this.linkFormControl.invalid || this.model.updating;
  }

  public isIngredientsSubmitDisabled(): boolean {
    return this.ingredientsFormArray.invalid || this.model.updating;
  }

  public isPreparationsSubmitDisabled(): boolean {
    return this.preparationsFormArray.invalid || this.model.updating;
  }

  public isCookingStepsSubmitDisabled(): boolean {
    return this.cookingStepsFormArray.invalid || this.model.updating;
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

  public addPreparation(): void {
    this.preparationsFormArray.push(new FormControl('', [Validators.required]));
  }

  public removePreparation(index: number): void {
    this.preparationsFormArray.removeAt(index);
  }

  public addCookingSteps(): void {
    this.cookingStepsFormArray.push(new FormControl('', [Validators.required]));
  }

  public removeCookingSteps(index: number): void {
    this.cookingStepsFormArray.removeAt(index);
  }
}
