import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AwsFileUploader } from './aws-file-uploader';
import { AwsFileRetriever } from './aws-file-retriever';
import { Auth0Interceptor } from '@reusable-parts/logic/integration/auth0';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AwsFileUploader,
    AwsFileRetriever,
    { provide: HTTP_INTERCEPTORS, useClass: Auth0Interceptor, multi: true },
  ],
})
export class AwsFileUploadModule {}
