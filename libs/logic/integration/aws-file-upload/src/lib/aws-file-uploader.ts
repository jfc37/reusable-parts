import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

const S3_URL = 'https://vallum-dev.s3.ap-southeast-2.amazonaws.com';

@Injectable()
export class AwsFileUploader {
  constructor(private httpClient: HttpClient) {}
  public upload(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('upload', file);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const request = new HttpRequest('PUT', [S3_URL, file.name].join('/'), formData, options);

    return this.httpClient.request(request).pipe(mapTo(null));
  }
}
