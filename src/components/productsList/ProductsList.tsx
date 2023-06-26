import css from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../../redux/cartReducer";
import { useGetProductsByShopIdQuery } from "../../redux/shopsAPI";
import { useMediaQuery } from "react-responsive";
import { State } from "@/models/cart";
import Image from "next/image";
import { Product } from "@/models/product";

//Components
import { ProductCard } from "../productCard/ProductCard";
import HomeImage from "../../img/Online_Shoping.jpg";

interface ProductsListProps {
  currentShop: string;
}

export const ProductsList = ({ currentShop }: ProductsListProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart.cart);

  const { data } = useGetProductsByShopIdQuery(currentShop);

  const handleAddToCart = (product: Product) => {
    const totalPrice = product.price;
    dispatch(cartSlice.actions.addToCart({ ...product, qty: 1, totalPrice }));
    dispatch(cartSlice.actions.changeSum());
  };

  const isInCart = (id: string) => {
    return cart.some((obj) => obj._id === id);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <>
      {data ? (
        <ul className={css.productsCardsWrap}>
          {data.map((item: Product) => (
            <li className={css.productCardItem} key={item._id}>
              <ProductCard
                isInCart={isInCart}
                product={item}
                onAddToCart={handleAddToCart}
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          {isMobile && (
            <p className={css.startText}>
              Choose you favourite restaurant and start shoping!
            </p>
          )}
          <Image className={css.homeImg} src={HomeImage} alt="Delivery" />
        </>
      )}
    </>
  );
};
