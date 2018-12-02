import { Injectable } from '@angular/core';
import { CopperPerson } from '../models/copper-person';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root',
})
export class CopperPeopleService {
  public update(person: Partial<CopperPerson>): Observable<void> {
    return of(null);
  }
}
