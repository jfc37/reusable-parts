import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SortDirection } from '@reusable-parts/common-ngrx-patterns';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'jfc-blocks-table',
  templateUrl: './blocks-table.component.html',
  styleUrls: ['./blocks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksTableComponent implements AfterViewInit, OnChanges {
  @Input() public rows: BlockRowModel[];

  @Output() public sortChanged = new EventEmitter<SortChange>();
  @Output() public generateBlock = new EventEmitter<string>();
  @Output() public deleteBlock = new EventEmitter<string>();

  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource(this.rows);

  public displayedColumns = ['name', 'startDate', 'day', 'time', 'actions'];

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.dataSource.data = this.rows;
    }
  }

  public sortChange(data) {
    this.sortChanged.emit({
      orderBy: data['active'] || 'startDate',
      sortDirection: data['direction'] || 'desc',
    });
  }

  public generateClicked(element): void {
    this.generateBlock.emit(element.id);
  }

  public deleteClicked(element): void {
    this.deleteBlock.emit(element.id);
  }
}

export interface BlockRowModel {
  id: string;
  name: string;
  startDate: string;
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

export interface SortChange {
  orderBy: string;
  sortDirection: SortDirection;
}
