
// angular import
import { Component, output } from '@angular/core';

// project import
import { FriendsList } from '../../../../../../fack-db/friends-list';
import { SharedModule } from '../../../../../shared/shared.module';
import { FriendComponent } from './friend/friend.component';
import { DataFilterPipe } from '../../../../../shared/filter/data-filter.pipe';

@Component({
  selector: 'app-chat-user-list',
  imports: [SharedModule, FriendComponent, DataFilterPipe],
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent {
  readonly ChatCollapse = output();
  readonly ChatToggle = output();
  // eslint-disable-next-line
  friendsList: any;
  searchFriends!: string;

  constructor() {
    this.friendsList = FriendsList.friends;
  }

  ChatOn() {
    this.ChatToggle.emit();
  }
}
