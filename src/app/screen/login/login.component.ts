import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {Friend} from "../../models/friend";
import {FriendsService} from "../../services/friends.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User[] = [];
  public dataFriend: any[] = [];
  private id!: string;
  constructor(
    private userService: UserService,
    private friendService: FriendsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.login();
  }
  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
      Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(100),
    ]),
  });
  public login(): void | boolean {
    if (this.userForm.invalid) {
      return false;
    }
    this.userService.signOut();
    this.user = [
      {
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      },
    ];
    this.userService.signIn(this.user).subscribe(
      (data: any) => {
        console.log(data);
        this.userService.setToken(data.token);
        this.userService.setID(data.user._id);

        this.router.navigate([`/`]);
      },


    );
  }

}

