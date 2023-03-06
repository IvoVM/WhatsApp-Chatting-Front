import { AuthenticationService } from './authentication.service';
import { SocketsService } from './sockets.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  chats: Array<any> = [
    {
      name: 'Start',
      time: '8:20 AM',
      latestMessage: 'Click on me!',
      latestMessageRead: true,
      messages: [
        {
          id: 1,
          body: 'To start this app',
          time: '8:30',
          me: false,
        },
        { id: 2, body: 'please send a message here', time: '8:30', me: false },
        {
          id: 3,
          body: 'and respond to yourself from another window',
          time: '8:30',
          me: false,
        },
      ],
    },
  ];
  constructor(
    private socket: SocketsService,
    private authSvc: AuthenticationService
  ) {
    this.onReceiveMessage();
  }
  sendMessage(messageInfo?: any) {
    this.socket.io.emit('sendMessage', messageInfo);
  }
  onReceiveMessage() {
    this.socket.io.on('receiveMessage', (messageInfo) => {
      let chatAlreadyExist = this.chats.find((e) => e.name == messageInfo.name);
      if (chatAlreadyExist) {
        chatAlreadyExist.latestMessage = messageInfo.latestMessage;
        if (chatAlreadyExist.messages) {
          chatAlreadyExist.messages.push({
            body: messageInfo.latestMessage,
            time: '8:30',
            me: false,
          });
        } else {
          chatAlreadyExist.messages = [
            { body: messageInfo.latestMessage, time: '8:30', me: false },
          ];
        }
        console.log(this.chats);
      }
      //crear un nuevo chat en caso de que no exista
      else {
        if (messageInfo.messages) {
          chatAlreadyExist.messages.push({
            body: messageInfo.latestMessage,
            time: '8:30',
            me: false,
          });
        } else {
          messageInfo.messages = [
            { body: messageInfo.latestMessage, time: '8:30', me: false },
          ];
        }
        this.chats.push(messageInfo);
      }
    });
  }
}
