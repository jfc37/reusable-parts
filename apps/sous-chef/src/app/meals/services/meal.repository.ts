import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Meal } from '../+state/meals/meals.state';
import { delay, tap, mapTo } from 'rxjs/operators';

@Injectable()
export class MealRepository {
  constructor(private afs: AngularFirestore) {}

  public getAll(): Observable<Meal[]> {
    return this.afs
      .collection<Meal>('meals')
      .snapshotChanges()
      .map(actions =>
        actions.map(
          a => ({ ...a.payload.doc.data(), id: a.payload.doc.id } as Meal)
        )
      );
  }

  public update(id: string, meal: Partial<Meal>): Observable<void> {
    return Observable.fromPromise(
      this.afs.doc<Meal>(`meals/${id}`).update({ ...meal })
    );
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Meal>(`meals/${id}`).delete());
  }

  public create(meal: Partial<Meal>): Observable<void> {
    return Observable.fromPromise(
      this.afs.collection<Partial<Meal>>('meals').add(meal)
    ).pipe(mapTo(null));
  }
}
