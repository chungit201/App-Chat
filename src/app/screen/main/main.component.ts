import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {UserService} from "../../services/user.service";
import { User } from '../../models/user';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private  webSocketService:WebSocketService,
    private  userService:UserService
  ) { }

  ngOnInit(): void {
    this.webSocketService.connnect();
  }

}
