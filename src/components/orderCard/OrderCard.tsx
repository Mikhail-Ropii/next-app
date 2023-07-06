import css from "./styles.module.css";
import Image from "next/image";

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

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className={css.orderWrap}>
      <ul className={css.mealWrap}>
        {order.cart.map((item: Product) => (
          <li key={item._id}>
            <div className={css.imgThumb}>
              <Image
                width={200}
                height={150}
                className={css.img}
                src={item.img}
                alt="Meal"
              />
            </div>
            <div>
              <p className={css.productName}>{item.name}</p>
              <p className={css.productPrice}>
                {item.price} x {item.qty} ={" "}
                {parseFloat(item.totalPrice).toFixed(2)} $
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className={css.sumText}>
        Total sum:{" "}
        <span className={css.sumNumber}>
          {parseFloat(order.sum).toFixed(2)} $
        </span>{" "}
      </p>
    </div>
  );
};
