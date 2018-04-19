import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Meal } from '../+state/meals/meals.state';
import { delay } from 'rxjs/operators';

@Injectable()
export class MealRepository {

  constructor(private afs: AngularFirestore) { }

  public getAll(): Observable<Meal[]> {
    return this.afs.collection<Meal>('meals')
      .snapshotChanges()
      .map(actions =>
        actions.map(a => ({ ...a.payload.doc.data(), id: a.payload.doc.id } as Meal))
      );
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Meal>(`meals/${id}`).delete());
  }

  public create(name: string): Observable<void> {
    return Observable.of(null).pipe(delay(1000));
  }

}
