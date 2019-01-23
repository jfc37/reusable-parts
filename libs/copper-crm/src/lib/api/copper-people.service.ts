import { Injectable } from '@angular/core';
import { CopperPerson } from '../models/copper-person';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CopperPeopleService {
  constructor(private http: HttpClient) {}
  public update(person: Partial<CopperPerson>): Observable<void> {
    return this.http.put(`https://us-central1-vallum-truepic.cloudfunctions.net/copperPerson/`, person).pipe(
      tap(console.error.bind('xxx')),
      map(() => null),
    );
  }
}
