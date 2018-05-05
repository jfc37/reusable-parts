import { Component, OnInit } from '@angular/core';
import { isArrayEmpty } from '@reusable-parts/common-functions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  BlockRowModel,
  BlockStatusTypes,
} from '../components/blocks-table/blocks-table.component';
import { Store } from '@ngrx/store';
import { BlockFeatureState } from '../../../state/block-state/block-feature.reducer';
import {
  ResetLoadBlocks,
  GetMoreBlocks,
} from '../../../state/block-state/loading-blocks/loading-blocks.actions';
import { SortDirection } from '@reusable-parts/common-ngrx-patterns';
import { blockRowsSelector } from './view-blocks-page.component.selectors';

@Component({
  selector: 'jfc-view-blocks-page',
  templateUrl: './view-blocks-page.component.html',
  styleUrls: ['./view-blocks-page.component.scss'],
})
export class ViewBlocksPageComponent implements OnInit {
  public rows$: Observable<BlockRowModel[]>;
  public hasNoBlocks$: Observable<boolean>;

  private orderBy = 'name';
  private sortDirection = SortDirection.Ascending;

  constructor(private store: Store<BlockFeatureState>) {}

  public ngOnInit(): void {
    this.rows$ = this.store.select(blockRowsSelector);
    this.hasNoBlocks$ = this.rows$.map(isArrayEmpty);

    this.store.dispatch(new ResetLoadBlocks());
    this.store.dispatch(new GetMoreBlocks(this.orderBy, this.sortDirection));
  }

  public loadMore() {
    this.store.dispatch(new GetMoreBlocks(this.orderBy, this.sortDirection));
  }

  public sortChanged(sortChange: {
    orderBy: string;
    sortDirection: SortDirection;
  }) {
    this.orderBy = sortChange.orderBy;
    this.sortDirection = sortChange.sortDirection;
  }
}
