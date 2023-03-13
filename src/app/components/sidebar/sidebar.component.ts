import { ConversationsService } from './../../services/conversations.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public searchText!: string;
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  public conversations:any[] = [];

  
  constructor(private convSvc: ConversationsService) {}

  ngOnInit(): void {
    this.conversations = this.convSvc.chats;
    console.log(this.conversations)
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
