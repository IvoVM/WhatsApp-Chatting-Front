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
  public conversations: Array<any> = [
    {
      name: 'David',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'Carlos',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'Juliana',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'Alice',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'Ivo',
      time: '8:20 AM',
      latestMessage: 'Do you like this app?',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'David',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'David',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
    {
      name: 'David',
      time: '8:20 AM',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'good and you?', time: '8:30', me: true },
        { id: 2, body: 'how are you?', time: '8:30', me: false },
        { id: 3, body: 'Hi', time: '8:30', me: true },
      ],
    },
  ];

  constructor(private convSvc: ConversationsService) {}

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
