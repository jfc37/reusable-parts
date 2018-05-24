import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export enum AlertType {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

@Component({
  selector: 'jfc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnChanges {
  @Input() public type: AlertType;

  public colourClass: string;
  public icon: string;

  public ngOnChanges(changes: SimpleChanges): void {
    switch (this.type) {
      case AlertType.error: {
        this.colourClass = 'mat-warn-100-bg';
        this.icon = 'error_outline';
        break;
      }

      case AlertType.warning: {
        this.colourClass = 'mat-orange-100-bg';
        this.icon = 'warning';
        break;
      }

      case AlertType.info: {
        this.colourClass = 'mat-accent-100-bg';
        this.icon = 'info_outline';
        break;
      }

      case AlertType.success: {
        this.colourClass = 'mat-green-100-bg';
        this.icon = 'check';
        break;
      }
    }
  }
}
