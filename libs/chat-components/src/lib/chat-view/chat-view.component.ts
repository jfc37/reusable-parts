import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { ChatService } from '../chat.service';
import { FusePerfectScrollbarDirective } from '@reusable-parts/@fuse';
import { ChatUser, ChatContact, Chat } from '../chat.facade';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public user: ChatUser;
  chat: any;
  dialog: any;
  contact: ChatContact;
  replyInput: any;
  selectedChat: Chat;

  @ViewChild(FusePerfectScrollbarDirective)
  directiveScroll: FusePerfectScrollbarDirective;

  @ViewChildren('replyInput')
  replyInputField;

  @ViewChild('replyForm')
  replyForm: NgForm;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ChatService} _chatService
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
    this._chatService.selectedChat$.pipe(takeUntil(this._unsubscribeAll)).subscribe(chatData => {
      if (chatData) {
        this.selectedChat = chatData;
        this.dialog = chatData.dialog;
        this.readyToReply();
      }
    });

    this._chatService.selectedContact$.pipe(takeUntil(this._unsubscribeAll)).subscribe(contact => {
      if (contact) {
        this.contact = contact;
        this.readyToReply();
      }
    });
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    this.replyInput = this.replyInputField.first.nativeElement;
    this.readyToReply();
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
   * Decide whether to show or not the contact's avatar in the message row
   *
   * @param message
   * @param i
   * @returns {boolean}
   */
  shouldShowContactAvatar(message, i): boolean {
    return (
      message.who === this.contact.id &&
      ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.contact.id) || !this.dialog[i + 1])
    );
  }

  /**
   * Check if the given message is the first message of a group
   *
   * @param message
   * @param i
   * @returns {boolean}
   */
  isFirstMessageOfGroup(message, i): boolean {
    return i === 0 || (this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
  }

  /**
   * Check if the given message is the last message of a group
   *
   * @param message
   * @param i
   * @returns {boolean}
   */
  isLastMessageOfGroup(message, i): boolean {
    return i === this.dialog.length - 1 || (this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
  }

  /**
   * Select contact
   */
  selectContact(): void {
    this._chatService.selectContact(this.contact);
  }

  /**
   * Ready to reply
   */
  readyToReply(): void {
    setTimeout(() => {
      this.focusReplyInput();
      this.scrollToBottom();
    });
  }

  /**
   * Focus to the reply input
   */
  focusReplyInput(): void {
    setTimeout(() => {
      this.replyInput.focus();
    });
  }

  /**
   * Scroll to the bottom
   *
   * @param {number} speed
   */
  scrollToBottom(speed?: number): void {
    speed = speed || 400;
    if (this.directiveScroll) {
      this.directiveScroll.update();

      setTimeout(() => {
        this.directiveScroll.scrollToBottom(0, speed);
      });
    }
  }

  /**
   * Reply
   */
  reply(event): void {
    event.preventDefault();

    if (!this.replyForm.form.value.message) {
      return;
    }

    // Message
    const message = {
      who: this.user.id,
      message: this.replyForm.form.value.message,
      time: new Date().toISOString(),
    };

    // Add the message to the chat
    this.dialog.push(message);

    // Reset the reply form
    this.replyForm.reset();

    // Update the server
    this._chatService.updateDialog(this.selectedChat.id, this.dialog).subscribe(() => this.readyToReply());
  }
}
