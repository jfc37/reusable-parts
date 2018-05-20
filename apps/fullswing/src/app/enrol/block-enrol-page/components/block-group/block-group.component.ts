import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BlockCardModel } from '../block-card/block-card.component.model';
import { groupBy } from '@reusable-parts/common-functions';

@Component({
  selector: 'jfc-block-group',
  templateUrl: './block-group.component.html',
  styleUrls: ['./block-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockGroupComponent implements OnChanges {
  @Input() public title: string;
  @Input() public blockCards: BlockCardModel[];

  @Output() public enrol = new EventEmitter<string>();

  public groupedByTime: Array<BlockCardModel[]>;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['blockCards']) {
      this.groupedByTime = Array.from(groupBy(this.blockCards, card => card.time).values());
    }
  }
}
