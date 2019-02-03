import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TruePicFacade } from '../facades/true-pic.facade';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
})
export class PictureDetailsComponent implements OnInit {
  public pictureId = new FormControl();
  public loading$: Observable<boolean>;
  public results$: Observable<any>;
  public errorMessage$: Observable<string>;

  constructor(private truePic: TruePicFacade) {}

  public ngOnInit() {
    this.loading$ = this.truePic.loading$;
    this.results$ = this.truePic.results$;
    this.errorMessage$ = this.truePic.errorMessage$;
  }

  public submit() {
    this.truePic.retrieve(this.pictureId.value);
  }
}
