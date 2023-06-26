import { type } from "os";
import { OrderCard } from "../orderCard/OrderCard";
import css from "./styles.module.css";
import { ObjectId } from "mongodb";

interface Product {
  shop: string;
  _id: string;
  name: string;
  img: string;
  qty: number;
  price: number;
  totalPrice: string;
}

interface Order {
  _id: string;
  cart: Product[];
  sum: string;
}

interface OrderListProps {
  orders: Order[];
}

export const OrdersList = ({ orders }: OrderListProps) => {
  return (
    <ul className={css.orderCardsWrap}>
      {orders.map((item) => (
        <li className={css.orderItem} key={item._id}>
          <OrderCard order={item} />
        </li>
      ))}
    </ul>
  );
};
