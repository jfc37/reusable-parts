import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AWS_FILE_UPLOAD_CONFIG, AwsFileUploadConfig } from './aws-file-upload.config';

@Injectable()
export class AwsFileRetriever {
  constructor(@Inject(AWS_FILE_UPLOAD_CONFIG) private config: AwsFileUploadConfig, private httpClient: HttpClient) {}

  public getAllMetadata(): Observable<FileMetadata[]> {
    return this.httpClient.get<AwsObjectMetadata[]>(this.config.getFileMetadataUrl, this.getAuthHeader()).pipe(
      map(awsObjects =>
        awsObjects.map(o => ({
          key: o.Key,
          lastModified: o.LastModified,
          size: o.Size,
        })),
      ),
    );
  }

  public getFileLink(key: string): Observable<string> {
    const url = `${this.config.getFileLinkUrl}?filename=${key}`;
    return this.httpClient.get<AwsFileLink>(url, this.getAuthHeader()).pipe(map(link => link.downloadURL));
  }

  private getAuthHeader() {
    const authToken = localStorage.getItem('id_token');

    return {
      headers: { ['Authorization']: `Bearer ${authToken}` },
    };
  }
}

export interface FileMetadata {
  key: string;
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

interface AwsFileLink {
  downloadURL: string;
}
