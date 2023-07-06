import { useEffect } from "react";
import css from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { cartSlice } from "../../redux/cartReducer";
import { useLazyGetProductsByShopIdQuery } from "../../redux/shopsAPI";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { Product } from "@/models/product";
import { RootState } from "@/redux/store";

//Components
import { Watch } from "react-loader-spinner";
import { ProductCard } from "../productCard/ProductCard";

interface ProductsListProps {
  currentShop: string | null;
}

export const ProductsList = ({ currentShop }: ProductsListProps) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart.cart);

  const [getProducts, { data, isFetching }] = useLazyGetProductsByShopIdQuery();

  useEffect(() => {
    if (currentShop) {
      getProducts(currentShop);
    }
  }, [currentShop, getProducts]);

  const handleAddToCart = (product: Product) => {
    const totalPrice = product.price;
    dispatch(cartSlice.actions.addToCart({ ...product, qty: 1, totalPrice }));
    dispatch(cartSlice.actions.changeSum());
  };

  const isInCart = (id: string) => {
    return cart.some((obj: { _id: string }) => obj._id === id);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <>
      {isFetching ? (
        <div className={css.spinerWrap}>
          <Watch
            height="120"
            width="120"
            radius="48"
            color="#2196f3"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
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
              <Image
                className={css.homeImg}
                width={600}
                height={600}
                priority
                src={"/img/Online_Shoping.jpg"}
                alt="Delivery"
              />
            </>
          )}
        </>
      )}
    </>
  );
};
