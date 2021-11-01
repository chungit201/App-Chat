import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  public profile?: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getProfile()
  }
  private getProfile(): void {
    this.userService.profile(this.userService.getID()).subscribe((data: User[]) => {
      this.profile = data;
      console.log(data);

    });
  }

}
