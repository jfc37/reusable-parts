import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AwsFileUploader, AwsFileRetriever } from '@reusable-parts/logic/integration/aws-file-upload';
import { map } from 'rxjs/operators';

@Injectable()
export class DocumentHandler {
  constructor(private awsFileUploader: AwsFileUploader, private awsFileRetriever: AwsFileRetriever) {}

  public getDocuments(): Observable<Document[]> {
    return this.awsFileRetriever.getAllMetadata().pipe(
      map(files =>
        files.map(f => ({
          name: f.key,
          url: f.url,
          lastModified: f.lastModified,
          size: f.size,
        })),
      ),
    );
  }

  public upload(file: File): Observable<void> {
    return this.awsFileUploader.upload(file);
  }
}

export interface Document {
  name: string;
  url: string;
  lastModified: string;
  size: number;
}
