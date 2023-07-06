import css from "./styles.module.css";
import { useSelector } from "react-redux";
import { useGetShopsListQuery } from "../../redux/shopsAPI";
import { Shop } from "@/models/shop";
import { RootState } from "@/redux/store";

interface ShopListProps {
  onSelectShop: (item: Shop) => void;
  currentShop: string | null;
  setIsShopListOpen: (value: boolean) => void;
}

export const ShopList = ({
  onSelectShop,
  currentShop,
  setIsShopListOpen,
}: ShopListProps) => {
  const { data } = useGetShopsListQuery({});
  const cart = useSelector((state: RootState) => state.cart.cart);
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
                onClick={() => {
                  onSelectShop(item);
                  setIsShopListOpen(false);
                }}
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
