import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'jfc-editable-meal-card',
  templateUrl: './editable-meal-card.component.html',
  styleUrls: ['./editable-meal-card.component.scss']
})
export class EditableMealCardComponent implements OnInit, OnChanges {
  @Input() public creating: boolean;
  @Input() public reset: boolean;

  @Output() public create = new EventEmitter<string>();

  public nameFormControl: FormControl;
  public createButtonText = 'CREATE';

  public ngOnInit() {
    this.nameFormControl = new FormControl('', [Validators.required]);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.reset) {
      this.nameFormControl.reset();
      this.nameFormControl.markAsPristine();
      this.nameFormControl.markAsUntouched();
    }

    if (this.creating) {
      this.createButtonText = 'CREATING';
    } else {
      this.createButtonText = 'CREATE';
    }
  }

  public displayError(field: string): boolean {
    return this.nameFormControl.invalid && this.nameFormControl.touched;
  }

  public submit(): void {
    if (!this.isSubmitDisabled()) {
      this.create.emit(this.nameFormControl.value)
    }
  }

  public isSubmitDisabled(): boolean {
    return this.nameFormControl.invalid || this.creating;
  }
}
