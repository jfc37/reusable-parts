import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jfc-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.scss'],
})
export class BlockCardComponent {
  @Input() public id: string;
  @Input() public title: string;
  @Input() public time: string;
  @Input() public enrolButtonText: string;
  @Input() public disabled: boolean;

  @Output() public enrol = new EventEmitter<string>();
}
