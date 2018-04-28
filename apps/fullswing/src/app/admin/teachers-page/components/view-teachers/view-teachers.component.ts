import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'jfc-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTeachersComponent {
  @Input() public teachers: TeacherModel[];

  @Output() public remove = new EventEmitter<string>();

  public displayedColumns = ['name', 'actions'];
}

export interface TeacherModel {
  id?: string;
  name: string;
  disableActions: boolean;
}
