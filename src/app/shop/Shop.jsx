import { useEffect, useState } from "react";
import css from "./styles.module.css";
import { cartSlice } from "../../redux/cartReducer";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
//Components
import { ShopList } from "../../components/shopList/ShopList";
import { ProductsList } from "../../components/productsList/ProductsList";
import { Container } from "../../components/container/Container";
//Icons
import { AiOutlineShop } from "react-icons/ai";

export const Shop = () => {
  const dispatch = useDispatch();
  const [currentShop, setCurrentShop] = useState(null);
  const [isShopListOpen, setIsShopListOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  const handleSelectShop = (shop) => {
    setCurrentShop(shop._id);

    dispatch(cartSlice.actions.setShopLocation(shop.location));
  };

  useEffect(() => {
    if (cart.length !== 0) {
      setCurrentShop(cart[0].shop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Container>
      <div className={css.shopPageContent}>
        {isMobile ? (
          <>
            <div className={css.showBtnWrap}>
              <div
                className={css.shopShowBtn}
                onClick={() => setIsShopListOpen(!isShopListOpen)}
              >
                <AiOutlineShop
                  className={css.shopIcon}
                  size={22}
                  color={"green"}
                />
                {isShopListOpen ? "Hide shops" : "Show shops"}
              </div>
            </div>
            <div className={css.shopMenuWrap}>
              <div
                className={`${css.shopWrap} ${
                  isShopListOpen ? css.shopWrapActive : css.shopWrapHidden
                }`}
              >
                <p className={css.mainText}>Shops:</p>
                <ShopList
                  currentShop={currentShop}
                  onSelectShop={handleSelectShop}
                />
              </div>
            </div>
          </>
        ) : (
          <div className={css.shopWrap}>
            <p className={css.mainText}>Shops:</p>
            <ShopList
              currentShop={currentShop}
              onSelectShop={handleSelectShop}
            />
          </div>
        )}

        <div className={css.productsWrap}>
          <ProductsList currentShop={currentShop} />
        </div>
      </div>
    </Container>
  );
};
