import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, mapTo, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class AwsFileUploader {
  constructor(private httpClient: HttpClient) {}
  public upload(file: File, url: string): Observable<void> {
    const formData = new FormData();
    formData.append('upload', file);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const request = new HttpRequest('PUT', [url, file.name].join('/'), formData, options);

    return this.httpClient.request(request).pipe(
      tap(console.error.bind(null, 'xxxxx UPLOADED')),
      mapTo(null),
    );
  }
}
