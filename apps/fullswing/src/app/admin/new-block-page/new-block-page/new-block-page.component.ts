import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BlockFormModel } from '../components/block-form/block-form.component';

@Component({
  selector: 'jfc-new-block-page',
  templateUrl: './new-block-page.component.html',
  styleUrls: ['./new-block-page.component.scss'],
})
export class NewBlockPageComponent implements OnInit {
  public saveButtonText$: Observable<string>;
  public disabled$: Observable<boolean>;

  constructor() {}

  ngOnInit() {
    this.saveButtonText$ = of('Create');
    this.disabled$ = of(false);
  }

  public save(model: BlockFormModel): void {
    console.error('xxx SAVING', model);
  }
}
