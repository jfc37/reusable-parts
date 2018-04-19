import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jfc-editable-meal-card',
  templateUrl: './editable-meal-card.component.html',
  styleUrls: ['./editable-meal-card.component.scss']
})
export class EditableMealCardComponent implements OnInit, OnChanges {
  @Input() public creating: boolean;
  @Input() public reset: boolean;

  @Output() public create = new EventEmitter<string>();

  public form: FormGroup;
  public createButtonText = 'CREATE';

  public ngOnInit() {
    this.form = new FormBuilder().group({
      name: ['', [Validators.required]],
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.reset) {
      this.form.get('name').reset();
      this.form.get('name').markAsPristine();
    }

    if (this.creating) {
      this.createButtonText = 'CREATING';
    } else {
      this.createButtonText = 'CREATE';
    }
  }

  public displayError(field: string): boolean {
    const control = this.form.get(field);
    return control && control.invalid && control.touched;
  }

  public submit(): void {
    if (!this.isSubmitDisabled()) {
      this.create.emit(this.form.get('name').value)
    }
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid || this.creating;
  }
}
