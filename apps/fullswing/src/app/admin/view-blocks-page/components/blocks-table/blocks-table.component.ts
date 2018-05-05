import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SortDirection } from '@reusable-parts/common-ngrx-patterns';

@Component({
  selector: 'jfc-blocks-table',
  templateUrl: './blocks-table.component.html',
  styleUrls: ['./blocks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksTableComponent {
  @Input() public rows: BlockRowModel[];

  @Output()
  public sortChanged = new EventEmitter<{
    orderBy: string;
    sortDirection: SortDirection;
  }>();
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

  public sortChange(data) {
    this.sortChanged.emit({
      orderBy: data['active'] || 'name',
      sortDirection: data['direction'] || 'asc',
    });
  }
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
