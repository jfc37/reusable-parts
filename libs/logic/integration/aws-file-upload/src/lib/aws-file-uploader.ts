import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const GET_UPLOAD_URL = 'https://rikn5i59e8.execute-api.ap-southeast-2.amazonaws.com/default/getUploadUrl';

@Injectable()
export class AwsFileUploader {
  constructor(private httpClient: HttpClient) {}

  public upload(file: File): Observable<void> {
    const options = {
      reportProgress: true,
      headers: new HttpHeaders({
        ['x-amz-acl']: 'public-read',
      }),
    };

    const queryUrl = `${GET_UPLOAD_URL}?filename=${file.name}`;
    return this.httpClient.get<{ uploadURL: string }>(queryUrl).pipe(
      switchMap(x => this.httpClient.put(x.uploadURL, file, options)),
      mapTo(null),
    );
  }
}
