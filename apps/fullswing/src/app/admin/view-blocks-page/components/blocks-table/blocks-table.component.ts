import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'jfc-blocks-table',
  templateUrl: './blocks-table.component.html',
  styleUrls: ['./blocks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksTableComponent {
  @Input() public rows: BlockRowModel[];

  @Output() public generateBlock = new EventEmitter<string>();
  @Output() public deleteBlock = new EventEmitter<string>();

  public displayedColumns = [
    'name',
    'status',
    'between',
    'day',
    'time',
    'actions',
  ];
}

export interface BlockRowModel {
  id: string;
  name: string;
  status: BlockStatusTypes;
  between: string;
  day: string;
  time: string;

  disableGenerate: boolean;
  disableDelete: boolean;
}

export enum BlockStatusTypes {
  Active = 'active',
  Future = 'future',
  Finished = 'finished',
}
