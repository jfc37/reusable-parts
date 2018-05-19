import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BlockCardModel } from '../block-card/block-card.component.model';

@Component({
  selector: 'jfc-block-group',
  templateUrl: './block-group.component.html',
  styleUrls: ['./block-group.component.scss'],
})
export class BlockGroupComponent {
  @Input() public title: string;
  @Input() public blockCards: BlockCardModel[];

  @Output() public enrol = new EventEmitter<string>();
}
