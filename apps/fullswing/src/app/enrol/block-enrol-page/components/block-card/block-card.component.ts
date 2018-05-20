import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BlockCardModel } from './block-card.component.model';

@Component({
  selector: 'jfc-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockCardComponent {
  @Input() public model: BlockCardModel;

  @Output() public enrol = new EventEmitter<string>();
}
