import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const S3_URL = 'https://vallum-dev.s3.ap-southeast-2.amazonaws.com';
const S3_METADATA_URL = 'https://7a0hnav7hc.execute-api.ap-southeast-2.amazonaws.com/default/get-file-metadata';

@Injectable()
export class AwsFileRetriever {
  constructor(private httpClient: HttpClient) {}

  public getAllMetadata(): Observable<FileMetadata[]> {
    return this.httpClient.get<AwsObjectMetadata[]>(S3_METADATA_URL).pipe(
      map(awsObjects =>
        awsObjects.map(o => ({
          key: o.Key,
          url: [S3_URL, o.Key].join('/'),
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
