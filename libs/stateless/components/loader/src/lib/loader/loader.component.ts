import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'stateless-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
