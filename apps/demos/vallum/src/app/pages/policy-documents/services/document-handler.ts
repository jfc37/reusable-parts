import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class DocumentHandler {
  public getDocuments(): Observable<Document[]> {
    return of([]);
  }

  public upload(file: File): Observable<void> {
    console.error('Upload', file);
    return of(null);
  }
}

export interface Document {
  id: string;
  name: string;
  url: string;
}
