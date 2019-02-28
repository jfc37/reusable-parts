import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@reusable-parts/fuse';
import { ChatService } from './chat.service';
import { ChatUser, Chat, ChatContact, IChatFacade } from './chat.facade';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() service: IChatFacade;
  selectedChat: any;
  loaded$: Observable<boolean>;
  user$: Observable<ChatUser>;
  chats$: Observable<Chat[]>;
  contacts$: Observable<ChatContact[]>;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   *  {ChatService} _chatService
   */
  constructor(private _chatService: ChatService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._chatService.setupService(this.service);

    this.user$ = this._chatService.user$;
    this.chats$ = this._chatService.chats$;
    this.contacts$ = this._chatService.contacts$;
    this._chatService.selectedChat$.pipe(takeUntil(this._unsubscribeAll)).subscribe(chatData => {
      this.selectedChat = chatData;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
