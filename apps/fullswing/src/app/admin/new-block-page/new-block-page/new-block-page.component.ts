import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BlockFormModel } from '../components/block-form/block-form.component';
import { Store } from '@ngrx/store';
import { BlockFeatureState } from '../../../state/blocks/block-state/block-feature.reducer';
import { AttemptCreateBlock } from '../../../state/blocks/block-state/creating-block/creating-block.actions';
import { isCreatingBlockSelector } from '../../../state/blocks/block-state/creating-block/creating-block.selectors';
import { map } from 'rxjs/operators';
import { warningMessagesSelector } from './new-block-page.component.selectors';

@Component({
  selector: 'jfc-new-block-page',
  templateUrl: './new-block-page.component.html',
  styleUrls: ['./new-block-page.component.scss'],
})
export class NewBlockPageComponent implements OnInit {
  public saveButtonText$: Observable<string>;
  public disabled$: Observable<boolean>;
  public warningMessages$: Observable<string[]>;
  public hasWarnings$: Observable<boolean>;

  constructor(private store: Store<BlockFeatureState>) {}

  ngOnInit() {
    this.saveButtonText$ = of('Create');
    this.disabled$ = this.store.select(isCreatingBlockSelector);

    this.warningMessages$ = this.store.select(warningMessagesSelector);
    this.hasWarnings$ = this.warningMessages$.pipe(
      map(warningMessages => warningMessages.length > 0)
    );
  }

  public save(model: BlockFormModel): void {
    this.store.dispatch(new AttemptCreateBlock(model));
  }
}
