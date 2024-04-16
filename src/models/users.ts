import { ObjectId } from "mongoose";

export interface users {
    _id: ObjectId,
    username:string,
    email:string,
    password:string,
    photoUrl:string,
}