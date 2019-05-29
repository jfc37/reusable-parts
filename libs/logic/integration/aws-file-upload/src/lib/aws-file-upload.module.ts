import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AwsFileUploader } from './aws-file-uploader';
import { AwsFileRetriever } from './aws-file-retriever';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AwsFileUploader, AwsFileRetriever],
})
export class AwsFileUploadModule {}
