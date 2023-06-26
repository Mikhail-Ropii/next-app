import css from "./styles.module.css";
import { useSelector } from "react-redux";
import { useGetShopsListQuery } from "../../redux/shopsAPI";
import { State } from "@/models/cart";
import { Shop } from "@/models/shop";

interface ShopListProps {
  onSelectShop: (item: Shop) => void;
  currentShop: string;
}

export const ShopList = ({ onSelectShop, currentShop }: ShopListProps) => {
  const { data } = useGetShopsListQuery({});
  const cart = useSelector((state: State) => state.cart.cart);
  return (
    <>
      {data ? (
        <ul>
          {data.map((item: Shop) => (
            <li key={item._id} className={css.shopBtnWrap}>
              <button
                disabled={cart.length !== 0 && currentShop !== item._id}
                className={`${css.shopBtn} ${
                  currentShop === item._id ? css.shopBtnActive : ""
                }`}
                onClick={() => onSelectShop(item)}
                type="button"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
