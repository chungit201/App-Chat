import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { FriendsService } from 'src/app/services/friends.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public dataFriend: any[] = [];
  private id!: string;
  constructor(
    private userService: UserService,
    private friendService: FriendsService
  ) { }

  ngOnInit(): void {
    this.getID();
    this.getFriendUser();
  }
  private getFriendUser(): void {
    this.friendService.findUser(this.id).subscribe((data: Friend[]) => {
      let { friend }: any = data;
      friend.friends.forEach((element: string) => {
        this.userService.profileDetail(element).subscribe((data: any) => {
          this.dataFriend.push(data)
          console.log(this.dataFriend[0]);
        });
      });
    });
  }

  private getID(): void {
    this.id = this.userService.getID();
  }
}
