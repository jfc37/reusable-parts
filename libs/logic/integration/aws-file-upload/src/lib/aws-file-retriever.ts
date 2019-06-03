import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AWS_FILE_UPLOAD_CONFIG, AwsFileUploadConfig } from './aws-file-upload.config';

@Injectable()
export class AwsFileRetriever {
  constructor(@Inject(AWS_FILE_UPLOAD_CONFIG) private config: AwsFileUploadConfig, private httpClient: HttpClient) {}

  public getAllMetadata(): Observable<FileMetadata[]> {
    return this.httpClient.get<AwsObjectMetadata[]>(this.config.getFileMetadataUrl).pipe(
      map(awsObjects =>
        awsObjects.map(o => ({
          key: o.Key,
          url: [this.config.baseS3Url, o.Key].join('/'),
          lastModified: o.LastModified,
          size: o.Size,
        })),
      ),
    );
  }
}

export interface FileMetadata {
  key: string;
  url: string;
  lastModified: string;
  size: number;
}

interface AwsObjectMetadata {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: string;
}
