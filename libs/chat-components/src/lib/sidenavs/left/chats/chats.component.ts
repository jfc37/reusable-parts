import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@reusable-parts/@fuse/animations';
import { ChatService } from '../../../chat.service';
import { FuseMatSidenavHelperService } from '@reusable-parts/@fuse';
import { MediaService } from '@angular/flex-layout';
import { ChatUser, Chat, ChatContact } from '../../../chat.facade';

@Component({
  selector: 'chat-chats-sidenav',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ChatChatsSidenavComponent implements OnDestroy {
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
   * @param {ChatService} _chatService
   * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
   * @param {MediaObserver} _mediaService
   */
  constructor(
    private _chatService: ChatService,
    private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
    public _mediaService: MediaService,
  ) {
    // Set the defaults
    this.chatSearch = {
      name: '',
    };
    this.searchText = '';

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

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
   * @param contact
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
   * @param status
   */
  setUserStatus(status): void {
    this._chatService.setUserStatus(status);
  }

  /**
   * Change left sidenav view
   *
   * @param view
   */
  changeLeftSidenavView(view): void {
    this._chatService.onLeftSidenavViewChanged.next(view);
  }

  /**
   * Logout
   */
  logout(): void {
    console.log('logout triggered');
  }
}
