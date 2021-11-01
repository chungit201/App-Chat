import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {WebSocketService} from "../../services/web-socket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile?: any;
  constructor(
    private userService: UserService,
    private websocketService:WebSocketService
  ) {
  }

  ngOnInit(): void {

    this.getProfile();
  }

  private getProfile(): void {
    this.userService.profile(this.userService.getID()).subscribe((data: User[]) => {
      this.profile = data;
      console.log(data);
    });
  }
}
