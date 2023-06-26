import { ObjectId } from "mongodb";

export interface Product {
  _id: string;
  name: string;
  price: string;
  img: string;
  shop: string;
}
