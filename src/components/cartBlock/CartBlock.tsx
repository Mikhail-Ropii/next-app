import { useDispatch, useSelector } from "react-redux";
import css from "./styles.module.css";
import { cartSlice } from "../../redux/cartReducer";
import { ProductInCart } from "@/models/cart";
//Components
import { ProductCardCart } from "../productCardCart/ProductCardCart";
import { RootState } from "@/redux/store";

export const CartBlock = () => {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: RootState) => state.cart.cart
  ) as ProductInCart[];

  const handleMinusBtn = (product: ProductInCart) => {
    if (product.qty > 1) {
      dispatch(cartSlice.actions.minusQty(product._id));
      dispatch(cartSlice.actions.changeSum());
    }
  };
  const handlePlusBtn = (product: ProductInCart) => {
    dispatch(cartSlice.actions.plusQty(product._id));
    dispatch(cartSlice.actions.changeSum());
  };
  const handleRemoveProduct = (id: string) => {
    dispatch(cartSlice.actions.removeFromCart(id));
    dispatch(cartSlice.actions.changeSum());
  };

  return (
    <>
      {cart.length !== 0 ? (
        <ul className={css.productsCardsWrap}>
          {cart.map((item: ProductInCart) => (
            <li className={css.productListItem} key={item._id}>
              <ProductCardCart
                product={item}
                onMinusBtn={handleMinusBtn}
                onPlusBtn={handlePlusBtn}
                onRemoveProduct={handleRemoveProduct}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.emptyText}>Cart is empty</p>
      )}
    </>
  );
};
