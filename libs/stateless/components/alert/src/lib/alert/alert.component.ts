import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';

export enum AlertType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

@Component({
  selector: 'stateless-alert',
  template: `
    <div class="p-16 mb-16 font-size-16 message-box" [ngClass]="colourClass">
      <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="10px">
        <mat-icon>{{ icon }}</mat-icon>
        <div>
          <ng-container *ngTemplateOutlet="contentTemplate ? contentTemplate : defaultContent"> </ng-container>
        </div>
      </div>
    </div>

    <ng-template #defaultContent></ng-template>
  `,
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatelessAlertComponent implements OnInit, OnChanges {
  /**
   * Type of alert
   * Default is Error
   */
  @Input() public type: AlertType = AlertType.Error;

  @Input() public contentTemplate: TemplateRef<any>;

  public colourClass: string;
  public icon: string;

  public ngOnInit() {
    this.setValues();
  }
  public ngOnChanges(changes: SimpleChanges): void {
    this.setValues();
  }

  private setValues(): void {
    switch (this.type) {
      case AlertType.Warning: {
        this.colourClass = 'warning';
        this.icon = 'warning';
        break;
      }

      case AlertType.Info: {
        this.colourClass = 'info';
        this.icon = 'info_outline';
        break;
      }

      case AlertType.Success: {
        this.colourClass = 'success';
        this.icon = 'check';
        break;
      }

      default: {
        this.colourClass = 'error';
        this.icon = 'error_outline';
        break;
      }
    }
  }
}
