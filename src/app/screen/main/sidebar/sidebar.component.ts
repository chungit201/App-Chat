import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { FriendsService } from 'src/app/services/friends.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public dataFriend: any[] = [];
  private id!: string;
  public myName:any;
  public messager:any;
  
  constructor(
    private userService: UserService,
    private friendService: FriendsService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.getID();
    this.getFriendUser();
    this.getMessSidebar();
    this.profile()

  }
  public profile() {
    this.userService.profileDetail(this.userService.getID())
      .subscribe((data) => {
        this.myName = data;
        this.webSocketService.emits('user_connected', this.myName._id);
      })
  }
  private getFriendUser(): void {
    this.friendService.findUser(this.id).subscribe((data: Friend[]) => {
      let { friend }: any = data;
      friend.friends.forEach((element: string) => {
        this.userService.profileDetail(element).subscribe((data: any) => {
          this.dataFriend.push(data)
          console.log(this.dataFriend[0]._id)
        });
      });
    });
  }
  getMessSidebar(){
    this.webSocketService.listen('new_message').subscribe((data:any)=>{
      this.messager = data
    })
  }
  private getID(): void {
    this.id = this.userService.getID();
  }
}
