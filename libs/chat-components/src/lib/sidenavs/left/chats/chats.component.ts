import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@reusable-parts/fuse';
import { ChatService } from '../../../chat.service';
import { FuseMatSidenavHelperService } from '@reusable-parts/fuse';
import { MediaObserver } from '@angular/flex-layout';
import { ChatUser, Chat, ChatContact, UserStatus } from '../../../chat.facade';

@Component({
  selector: 'chat-chats-sidenav',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy {
  @Input() public chats: Chat[];
  chatSearch: any;
  @Input() public contacts: ChatContact[];
  searchText: string;
  @Input() public user: ChatUser;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   *  {ChatService} _chatService
   *  {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
   *  {MediaObserver} _mediaService
   */
  constructor(
    private _chatService: ChatService,
    private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
    public _mediaService: MediaObserver,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // Set the defaults
    this.chatSearch = {
      name: '',
    };
    this.searchText = '';

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get chat
   *
   *  contact
   */
  getChat(contact): void {
    this._chatService.selectChat(contact);

    if (!this._mediaService.isActive('gt-md')) {
      this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
    }
  }

  /**
   * Set user status
   *
   *  status
   */
  setUserStatus(status: string): void {
    this._chatService.setUserStatus(status as UserStatus);
  }

  /**
   * Change left sidenav view
   *
   *  view
   */
  changeLeftSidenavView(view): void {
    this._chatService.onLeftSidenavViewChanged.next(view);
  }
}
