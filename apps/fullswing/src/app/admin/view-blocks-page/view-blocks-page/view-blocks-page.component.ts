import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isArrayNotEmpty } from '@reusable-parts/common-functions';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { BlockFeatureState } from '../../../state/block-state/block-feature.reducer';
import { ChangeBlockSortOrder } from '../../../state/block-state/block-pages/block-pages.actions';
import { hasNoBlocksSelector } from '../../../state/block-state/blocks/blocks.selectors';
import {
  GetMoreBlocks,
  ResetLoadBlockPages,
} from '../../../state/block-state/loading-block-pages/loading-block-pages.actions';
import {
  BlockRowModel,
  SortChange,
} from '../components/blocks-table/blocks-table.component';
import {
  blockRowsSelector,
  isLoadingSelector,
} from './view-blocks-page.component.selectors';

@Component({
  selector: 'jfc-view-blocks-page',
  templateUrl: './view-blocks-page.component.html',
  styleUrls: ['./view-blocks-page.component.scss'],
})
export class ViewBlocksPageComponent implements OnInit {
  public loading$: Observable<boolean>;
  public rows$: Observable<BlockRowModel[]>;
  public hasNoBlocks$: Observable<boolean>;

  constructor(private store: Store<BlockFeatureState>) {}

  public ngOnInit(): void {
    this.loading$ = this.store.select(isLoadingSelector);
    this.rows$ = this.store
      .select(blockRowsSelector)
      .pipe(filter(isArrayNotEmpty));
    this.hasNoBlocks$ = this.store.select(hasNoBlocksSelector);

    this.store.dispatch(new ResetLoadBlockPages());
    this.store.dispatch(new GetMoreBlocks());
  }

  public loadMore() {
    this.store.dispatch(new GetMoreBlocks());
  }

  public sortChanged(sortChange: SortChange) {
    this.store.dispatch(
      new ChangeBlockSortOrder(sortChange.orderBy, sortChange.sortDirection)
    );
  }
}
