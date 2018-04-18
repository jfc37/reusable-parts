import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetAllMeals } from '../+state/meal-loading/meal-loading.actions';
import { MealsFeatureState } from '../+state/meals-feature.state';

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
    this.store.dispatch(new GetAllMeals());
  }

}
