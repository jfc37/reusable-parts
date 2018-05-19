import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BlockCardModel } from './block-card.component.model';

@Component({
  selector: 'jfc-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.scss'],
})
export class BlockCardComponent {
  @Input() public model: BlockCardModel;

  @Output() public enrol = new EventEmitter<string>();
}
