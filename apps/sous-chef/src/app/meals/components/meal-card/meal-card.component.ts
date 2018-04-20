import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, Optional, OnInit } from '@angular/core';
import { MealCardModel } from './meal-card.component.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'jfc-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit, OnChanges {
  @Input() public model: MealCardModel;
  @Input() public updatingLink: boolean;

  @Output() public deleteClicked = new EventEmitter();
  @Output() public expandClicked = new EventEmitter();
  @Output() public updateLink = new EventEmitter<string>();

  public linkFormControl: FormControl;
  public deleteButtonText = 'Delete';
  public updateLinkButtonText = 'Save';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.model) {
      this.model = data.model;
    }
  }

  public ngOnInit() {
    this.linkFormControl = new FormControl('', [Validators.required]);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.deleteButtonText = this.model.deleting ? 'Deleting...' : 'Delete';
    this.updateLinkButtonText = this.model.updatingLink ? 'Saving...' : 'Save';
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

  public isLinkSubmitDisabled(): boolean {
    return this.linkFormControl.invalid || this.updatingLink;
  }

  public displayError(control: FormControl): boolean {
    return control.invalid && control.touched;
  }
}
