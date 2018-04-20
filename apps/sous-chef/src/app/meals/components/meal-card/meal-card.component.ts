import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';
import { IngredientModel, MealCardModel } from './meal-card.component.model';

@Component({
  selector: 'jfc-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() public model: MealCardModel;

  @Output() public deleteClicked = new EventEmitter();
  @Output() public expandClicked = new EventEmitter();
  @Output() public updateLink = new EventEmitter<string>();
  @Output() public updateIngredients = new EventEmitter<IngredientModel[]>();
  @Output() public updatePreparations = new EventEmitter<string[]>();
  @Output() public updateCookingSteps = new EventEmitter<string[]>();

  @ViewChildren('focus') rows: QueryList<any>;

  public linkFormControl: FormControl;
  public ingredientsFormArray: FormArray;
  public preparationsFormArray: FormArray;
  public cookingStepsFormArray: FormArray;

  public deleteButtonText = 'Delete';
  public updateButtonText = 'Save';

  private onDestory$ = new ReplaySubject();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef
  ) {
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

  public ngAfterViewInit(): void {
    this.rows.changes.pipe(takeUntil(this.onDestory$)).subscribe(resp => {
      Array.from(resp)
        .filter((el: any) => el.nativeElement.classList.contains('focus'))
        .forEach((el: any) => {
          el.nativeElement.classList.remove('focus');
          el.nativeElement.focus();
          this.cd.detectChanges();
        });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.deleteButtonText = this.model.deleting ? 'Deleting...' : 'Delete';
    this.updateButtonText = this.model.updating ? 'Saving...' : 'Save';
  }

  public ngOnDestroy(): void {
    this.onDestory$.next(null);
    this.onDestory$.complete();
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
