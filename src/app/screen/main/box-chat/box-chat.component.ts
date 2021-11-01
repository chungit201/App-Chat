import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css']
})
export class BoxChatComponent implements OnInit {
  public id: any;
  public dataUser?: any;
  public myName: any
  public sender: any;
  public receiver: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
      console.log(this.id);
      this.getFriend(this.id);
      this.myUser();
      this.getMyMessage();

    });

  }
  focusSin(e: any) {
    this.webSocketService.emit("sendding-chat");
    const thongbao: any = document.querySelector('.sedding-mess')!;
    this.webSocketService.listen('a-sendding-message').subscribe((data: any) => {
      thongbao.innerHTML = `<img src="assets/waiting-texting (1).gif" height="100px">`
    })
  }
  focusOut(e: any) {
    this.webSocketService.emit("stop-sendding-chat");
    const thongbao: any = document.querySelector('.sedding-mess')!;
    this.webSocketService.listen('a-stop-message').subscribe((data: any) => {
      thongbao.innerHTML = "";
    })
  }
  public getFriend(id: any): void {
    this.userService.profileDetail(id)
      .subscribe((data) => {
        this.dataUser = data
        this.receiver = this.dataUser._id
        console.log(this.receiver);



      });
  };
  public myUser() {
    this.userService.profileDetail(this.userService.getID())
      .subscribe((data: any) => {
        this.sender = data._id;
        console.log(this.sender);
      })
  }

  chatForm = new FormGroup({
    messages: new FormControl(''),
  })

  submitMess() {
    const boxChat = document.querySelector('.grid-message') as HTMLElement;
    const sendMess = {
      sender: this.sender,
      receiver: this.receiver,
      message: this.chatForm.value.messages
    }
    var html = "";
    html += `
    <div class="col-message-sent">
    <div class="message-sent">
        <p>${this.chatForm.value.messages}</p>
    </div>
    </div>
    `

    boxChat.innerHTML += html
    window.scrollTo(0, document.body.scrollHeight);
    console.log(sendMess);
    this.webSocketService.emits('send_message', sendMess);
  };
  getMyMessage() {
    const boxChat = document.querySelector('.grid-message') as HTMLElement;
    this.webSocketService.listen('new_message').subscribe((data: any) => {
      console.log(data);
      console.log(this.myName.name);

      if (data.sender == this.myName.name) {
        const MyChat = `
              <div class="col-message-sent">
              <div class="message-sent">
                  <p>${data.message}</p>
              </div>
          </div>
              `
        boxChat.innerHTML += MyChat
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        const messfriend = `
                      <div class="col-message-received">
                              <div class="message-received">
                                  <p>${data.message}</p>
                              </div>
                          </div>`
        boxChat.innerHTML += messfriend;
        window.scrollTo(500, document.body.scrollHeight);
      }
    })
  }
}




