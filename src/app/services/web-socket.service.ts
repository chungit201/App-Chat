import { Injectable } from '@angular/core';
import { io,Socket } from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private url = 'ws://localhost:9999'
  constructor(
  ) {
    this.socket= io(this.url,{ transports: ['websocket', 'polling', 'flashsocket'] })
  }
  listen(eventName:string){
    return new  Observable((subscriber)=>{
      this.socket.on(eventName,(data)=>{
        subscriber.next(data);
      })
    })
  }
  connnect(){
    this.socket.on("connect",()=>{
      console.log(`You connected with id : ${this.socket.id}`)

    })
  }
  emits(eventName:string,data:any){
    this.socket.emit(eventName,data);
  }
  emit(eventName:string){
    this.socket.emit(eventName)
  }

}
