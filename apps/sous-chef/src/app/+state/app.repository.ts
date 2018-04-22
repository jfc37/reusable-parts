import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { delay, tap, mapTo } from 'rxjs/operators';
import { NavItem } from './app.state';

@Injectable()
export class AppRepository {
  constructor(private afs: AngularFirestore) {}

  public getAllMealItems(): Observable<NavItem[]> {
    return this.afs
      .collection<NavItem>('meals')
      .valueChanges()
      .map(values =>
        values.map(value => ({ name: value.name, slug: value.slug }))
      );
  }
}
