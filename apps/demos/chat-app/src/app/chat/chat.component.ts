import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatFacade } from '../chat.facade';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  constructor(private route: ActivatedRoute, public facade: ChatFacade) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('userId')),
        tap(id => this.facade.currentUserIdReplay.next(id)),
      )
      .subscribe();
  }
}
