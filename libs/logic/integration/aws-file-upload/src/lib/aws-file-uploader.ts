import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AwsFileUploadConfig, AWS_FILE_UPLOAD_CONFIG } from './aws-file-upload.config';

@Injectable()
export class AwsFileUploader {
  constructor(@Inject(AWS_FILE_UPLOAD_CONFIG) private config: AwsFileUploadConfig, private httpClient: HttpClient) {}

  public upload(file: File): Observable<void> {
    const queryUrl = `${this.config.getFileUploadUrl}?filename=${file.name}`;
    const authToken = localStorage.getItem('id_token');

    return this.httpClient
      .get<{ uploadURL: string }>(queryUrl, { headers: { ['Authorization']: `Bearer ${authToken}` } })
      .pipe(
        switchMap(x => this.httpClient.put(x.uploadURL, file)),
        mapTo(null),
      );
  }
}
