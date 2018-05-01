import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'jfc-block-form',
  templateUrl: './block-form.component.html',
  styleUrls: ['./block-form.component.scss'],
})
export class BlockFormComponent implements OnInit, OnChanges {
  @Input() public block: BlockFormModel;
  @Input() public teachers: TeacherModel[];
  @Input() public disabled: boolean;
  @Input() public saveButtonText: string;

  @Output() public save = new EventEmitter<BlockFormModel>();

  public form: FormGroup;
  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      classLength: new FormControl('', Validators.required),
      numberOfClasses: new FormControl('', Validators.required),
      classCapacity: new FormControl('', Validators.required),
      // teacher: new FormControl('', Validators.required),
      // inviteOnly: new FormControl(''),
    });

    this.updateFormBasedOnModel();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['block'] && !changes['block'].isFirstChange()) {
      this.updateFormBasedOnModel();
    }
  }

  public displayError(field: string): boolean {
    const control = this.form.get(field);
    return control && control.invalid && control.touched;
  }

  public submit(): void {
    const value = {
      ...this.form.value,
      startDate: format(this.form.value['startDate'], 'YYYY-MM-DD'),
    };

    this.save.emit(value);
  }

  private updateFormBasedOnModel() {
    if (this.block) {
      this.form.get('name').setValue(this.block.name);
      this.form.get('startDate').setValue(this.block.startDate);
    }
  }
}

export interface BlockFormModel {
  name: string;
  startDate: string;
  startTime: string;
  classLength: number;
  numberOfClasses: number;
  classCapacity: number;
  teacherIds?: string[];
  inviteOnly?: boolean;
}

export interface TeacherModel {
  label: string;
  value: string;
}
