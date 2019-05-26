import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vallum-upload-policy',
  template: `
    <div class="file-uploader">
      <input hidden type="file" #fileInput (change)="onFileChange($event)" />
      <button mat-fab class="floating-button" (click)="fileInput.click()" aria-label="Upload document">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .floating-button {
        position: fixed;
        bottom: 25px;
        right: 25px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPolicyComponent {
  @Output() upload = new EventEmitter<File>();
  public onFileChange(event): void {
    if (event.target.files) {
      this.upload.emit(event.target.files[0]);
    }
  }
}
