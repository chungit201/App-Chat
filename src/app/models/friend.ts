import { User } from "./user";

export interface Friend {
    _id: string;
    user: User;
    friends: Object;
}
