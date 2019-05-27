import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AwsFileUploader } from './aws-file-uploader';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AwsFileUploader],
})
export class AwsFileUploadModule {}
