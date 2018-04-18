import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MealsFeatureState } from '../+state/meals-feature.state';
import { SetMeals } from '../+state/meals/meals.actions';

@Component({
  selector: 'jfc-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss']
})
export class AllMealsComponent implements OnInit {

  constructor(
    private store: Store<MealsFeatureState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new SetMeals({id: '123', name: 'Hello World'}));
  }

}
