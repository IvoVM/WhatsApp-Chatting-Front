import { SocketsService } from './../../services/sockets.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public conversation: any;

  constructor(public SocketsService: SocketsService) {}

  ngOnInit(): void {}

  onConversationSelected(conversation: Object) {
    this.conversation = conversation;
  }
}
