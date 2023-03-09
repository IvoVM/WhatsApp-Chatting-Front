import { AuthGuardGuard } from './../../guards/auth-guard.guard';
import { ConversationsService } from './../../services/conversations.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public searchText!: string;
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  public conversations: Array<any> = [];

  constructor(private convSvc: ConversationsService, public authSvc:AuthenticationService) {}

  ngOnInit(): void {
    this.conversations = this.convSvc.chats;
  }

  get filteredConversations() {
    return this.conversations.filter((conversation) => {
      return (
        conversation.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }
}
