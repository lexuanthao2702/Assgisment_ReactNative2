import { ObjectId } from "mongoose";
import { products } from "./products";
import { users } from "./users";

export interface carts {
    _id:ObjectId,
    id_product:products,
    id_user:users,
    quantity:number,
    price_product:number,

}