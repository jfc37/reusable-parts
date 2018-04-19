import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jfc-editable-meal-card',
  templateUrl: './editable-meal-card.component.html',
  styleUrls: ['./editable-meal-card.component.scss']
})
export class EditableMealCardComponent implements OnInit {
  @Input() public creating: boolean;
  @Output() public create = new EventEmitter<string>();

  public form: FormGroup;

  public ngOnInit() {
    this.form = new FormBuilder().group({
      name: ['', [Validators.required]],
    });
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
