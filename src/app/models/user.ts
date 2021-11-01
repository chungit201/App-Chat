import { Friend } from "./friend";

export interface User {
    _id?: String;
    name?: String;
    email?: String;
    avatar?: String;
    status?: String;
    birthday?: Date;
    password?: String;
    socketId?:String;
    friend?: Friend;
    active?: Boolean;
    activeStatus?: Boolean;
}
