import { AuthenticationService } from './../../services/authentication.service';
import { ConversationsService } from './../../services/conversations.service';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() conversation: any;

  constructor(
    private ConversationsService: ConversationsService,
    private authSvc: AuthenticationService
  ) {}

  ngOnInit(): void {}

  submitMessage(event: any): any {
    let value = event.target.value.trim();
    event.target.value = '';
    if (value.length < 1) {
      return false;
    } else {
      let messageInfo = {
        name: this.authSvc.username,
        latestMessage: value,
        me: true,
        time: '8:20AM',
        latestMessageRead: true,
        body: value,
      };
      this.conversation.messages.push({
        id: this.conversation.messages.length + 1,
        body: value,
        time: '8:20AM',
        me: true,
      });
      this.ConversationsService.sendMessage(messageInfo);
    }
  }
}
