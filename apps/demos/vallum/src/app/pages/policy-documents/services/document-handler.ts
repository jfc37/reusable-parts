import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AwsFileUploader } from '@reusable-parts/logic/integration/aws-file-upload';

@Injectable()
export class DocumentHandler {
  constructor(private awsFileUploader: AwsFileUploader) {}
  public getDocuments(): Observable<Document[]> {
    return of([]);
  }

  public upload(file: File): Observable<void> {
    const url = 'https://vallum-dev.s3.ap-southeast-2.amazonaws.com/policies';
    return this.awsFileUploader.upload(file, url);
  }
}

export interface Document {
  id: string;
  name: string;
  url: string;
}
