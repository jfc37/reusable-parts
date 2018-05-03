import { Component, OnInit } from '@angular/core';
import { isArrayEmpty } from '@reusable-parts/common-functions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  BlockRowModel,
  BlockStatusTypes,
} from '../components/blocks-table/blocks-table.component';

@Component({
  selector: 'jfc-view-blocks-page',
  templateUrl: './view-blocks-page.component.html',
  styleUrls: ['./view-blocks-page.component.scss'],
})
export class ViewBlocksPageComponent implements OnInit {
  public rows$: Observable<BlockRowModel[]>;
  public hasNoBlocks$: Observable<boolean>;

  ngOnInit() {
    this.rows$ = of([
      {
        id: 'aaa',
        name: 'Blues Level 2',
        time: '19:30',
        day: 'Monday',
        disableDelete: false,
        disableGenerate: false,
        status: BlockStatusTypes.Active,
        between: '18 May - 25 August',
      } as BlockRowModel,
    ]);
    this.hasNoBlocks$ = this.rows$.map(isArrayEmpty);
  }
}
