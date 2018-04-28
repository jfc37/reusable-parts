import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map, filter } from 'rxjs/operators';

@Component({
  selector: 'jfc-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTeacherComponent implements OnInit, OnChanges {
  @Input() public potentialTeachers: PotentialTeacherModel[];
  @Input() public disabled: boolean;

  @Output() public addTeacher = new EventEmitter<string>();

  public selectionFormControl = new FormControl('', [
    Validators.required,
    isSelectionOption,
  ]);
  public filteredOptions$: Observable<PotentialTeacherModel[]>;

  public ngOnInit(): void {
    this.filteredOptions$ = this.selectionFormControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].isFirstChange()) {
      if (this.disabled) {
        this.selectionFormControl.disable();
      } else {
        this.selectionFormControl.enable();
      }
    }
  }

  public reset(): void {
    this.selectionFormControl.reset();
    this.selectionFormControl.updateValueAndValidity();
  }

  public displaySelectedOptionFn(user: PotentialTeacherModel): string {
    return user && user.name;
  }

  public submit(): void {
    this.addTeacher.emit(this.selectionFormControl.value.id);
  }

  private filter(val: string): PotentialTeacherModel[] {
    if (typeof val !== 'string' || val.length < 2) {
      return [];
    }
    val = val.toLowerCase();
    return this.potentialTeachers.filter(
      option => option.name.toLowerCase().indexOf(val) === 0
    );
  }
}

export interface PotentialTeacherModel {
  id: string;
  name: string;
}

function isSelectionOption(control: AbstractControl) {
  if (!control || typeof control.value === 'string') {
    return {
      isSelectionOption: true,
    };
  }
}
