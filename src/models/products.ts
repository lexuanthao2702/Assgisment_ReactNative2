import { ObjectId } from "mongoose";

export interface products{
    _id:ObjectId,
    image:Array<string>,
    name:string,
    origin:string,
    status:number,
    size:string,
    price:number,
    type:string
}