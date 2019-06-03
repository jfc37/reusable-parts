import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { AwsFileUploader, AwsFileRetriever } from '@reusable-parts/logic/integration/aws-file-upload';
import { map, take, tap, catchError } from 'rxjs/operators';

@Injectable()
export class DocumentHandler {
  public documents$ = new ReplaySubject<Document[]>();
  public loading$ = new ReplaySubject<boolean>();
  public errorLoading$ = new ReplaySubject<boolean>();

  constructor(private awsFileUploader: AwsFileUploader, private awsFileRetriever: AwsFileRetriever) {}

  public loadDocuments(): void {
    this.loading$.next(true);
    this.awsFileRetriever
      .getAllMetadata()
      .pipe(
        take(1),
        map(files =>
          files.map(f => ({
            name: f.key,
            url: f.url,
            lastModified: f.lastModified,
            size: f.size,
          })),
        ),
        catchError(() => {
          this.errorLoading$.next(true);
          return of([]);
        }),
      )
      .subscribe(files => {
        this.documents$.next(files);
        this.loading$.next(false);
      });
  }

  public upload(file: File): Observable<void> {
    return this.awsFileUploader.upload(file).pipe(tap(() => this.loadDocuments()));
  }
}

export interface Document {
  name: string;
  url: string;
  lastModified: string;
  size: number;
}
