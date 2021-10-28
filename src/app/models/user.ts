import { Friend } from "./friend";

export interface User {
    _id?: String;
    name?: String;
    email?: String;
    avatar?: String;
    status?: any;
    birthday?: Date;
    password?: String;
    friend?: Friend;
    active?: Boolean;
    activeStatus?: Boolean;
}
