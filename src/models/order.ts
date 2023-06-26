import { ObjectId } from "mongodb";

interface CartItem {
  shop: string;
  _id: ObjectId;
  name: string;
  img: string;
  qty: number;
  price: number;
  totalPrice: number;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  cart: CartItem[];
  sum: number;
  userData: UserData;
}
