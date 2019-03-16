import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ChatService } from '../../../chat.service';
import { ChatUser } from '../../../chat.facade';

@Component({
  selector: 'chat-user-sidenav',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatUserSidenavComponent implements OnInit, OnDestroy {
  @Input() public user: ChatUser;
  userForm: FormGroup;

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
    this.userForm = new FormGroup({
      mood: new FormControl(this.user.mood),
      status: new FormControl(this.user.status),
    });

    this.userForm.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(data => {
        this.user.mood = data.mood;
        this.user.status = data.status;
        this._chatService.updateUserData(this.user);
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Change left sidenav view
   *
   *  view
   */
  changeLeftSidenavView(view): void {
    this._chatService.onLeftSidenavViewChanged.next(view);
  }
}
