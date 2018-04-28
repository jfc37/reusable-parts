import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map, filter } from 'rxjs/operators';

@Component({
  selector: 'jfc-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTeacherComponent implements OnInit {
  @Input() public potentialTeachers: PotentialTeacherModel[];
  @Input() public disabled: boolean;

  @Output() public addTeacher = new EventEmitter<string>();

  public selectionFormControl = new FormControl('', Validators.required);
  public filteredOptions$: Observable<PotentialTeacherModel[]>;

  public ngOnInit(): void {
    this.filteredOptions$ = this.selectionFormControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  public reset(): void {
    this.selectionFormControl.reset();
    this.selectionFormControl.updateValueAndValidity();
  }

  public displaySelectedOptionFn(user: PotentialTeacherModel): string {
    return user && user.name;
  }

  public submit(): void {
    this.addTeacher.emit(this.selectionFormControl.value);
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
