import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isArrayNotEmpty } from '@reusable-parts/common-functions/src';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { BlockFeatureState } from '../../../state/block-state/block-feature.reducer';
import { ChangeBlockSortOrder, ResetBlockPages } from '../../../state/block-state/block-pages/block-pages.actions';
import { hasNoBlocksSelector } from '../../../state/block-state/blocks/blocks.selectors';
import {
  GetMoreBlocks,
  ResetLoadBlockPages,
} from '../../../state/block-state/loading-block-pages/loading-block-pages.actions';
import { BlockRowModel, SortChange } from '../components/blocks-table/blocks-table.component';
import { blockRowsSelector, isLoadingSelector, warningMessagesSelector } from './view-blocks-page.component.selectors';
import { hasMoreBlockPagesToRetrieveSelector } from '../../../state/block-state/block-pages/block-pages.selectors';
import {
  AttemptGenerateBlock,
  ResetGenerateBlock,
} from '../../../state/block-state/generating-block/generating-block.actions';
import { AttemptDeleteBlock, ResetDeleteBlock } from '../../../state/block-state/deleting-block/deleting-block.actions';

@Component({
  selector: 'jfc-view-blocks-page',
  templateUrl: './view-blocks-page.component.html',
  styleUrls: ['./view-blocks-page.component.scss'],
})
export class ViewBlocksPageComponent implements OnInit {
  public loading$: Observable<boolean>;
  public rows$: Observable<BlockRowModel[]>;
  public hasNoBlocks$: Observable<boolean>;
  public showLoadMoreButton$: Observable<boolean>;
  public warningMessages$: Observable<string[]>;
  public hasWarnings$: Observable<boolean>;

  constructor(private store: Store<BlockFeatureState>) {}

  public ngOnInit(): void {
    this.loading$ = this.store.pipe(select(isLoadingSelector));
    this.rows$ = this.store.pipe(select(blockRowsSelector), filter(isArrayNotEmpty));
    this.hasNoBlocks$ = this.store.pipe(select(hasNoBlocksSelector));
    this.showLoadMoreButton$ = this.store.pipe(select(hasMoreBlockPagesToRetrieveSelector));

    this.warningMessages$ = this.store.pipe(select(warningMessagesSelector));
    this.hasWarnings$ = this.warningMessages$.pipe(map(isArrayNotEmpty));

    this.store.dispatch(new ResetBlockPages());
    this.store.dispatch(new ResetLoadBlockPages());
    this.store.dispatch(new ResetGenerateBlock());
    this.store.dispatch(new ResetDeleteBlock());
    this.store.dispatch(new GetMoreBlocks());
  }

  public loadMore(): void {
    this.store.dispatch(new GetMoreBlocks());
  }

  public sortChanged(sortChange: SortChange): void {
    this.store.dispatch(new ChangeBlockSortOrder(sortChange.orderBy, sortChange.sortDirection));
  }

  public generateBlock(id: string): void {
    this.store.dispatch(new AttemptGenerateBlock(id));
  }

  public deleteBlock(id: string): void {
    this.store.dispatch(new AttemptDeleteBlock(id));
  }
}
