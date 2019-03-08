import { Component, Input, OnChanges, SimpleChanges, OnInit, TemplateRef } from '@angular/core';

export enum AlertType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

@Component({
  selector: 'stateless-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
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
      case AlertType.Error: {
        this.colourClass = 'error';
        this.icon = 'error_outline';
        break;
      }

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
    }
  }
}
