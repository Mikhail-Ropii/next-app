import css from "./styles.module.css";
import Image from "next/image";
import { ProductInCart } from "@/models/cart";
import { useMediaQuery } from "react-responsive";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

interface ProductCardCartProps {
  product: ProductInCart;
  onMinusBtn: (product: ProductInCart) => void;
  onPlusBtn: (product: ProductInCart) => void;
  onRemoveProduct: (_id: string) => void;
}

export const ProductCardCart = ({
  product,
  onMinusBtn,
  onPlusBtn,
  onRemoveProduct,
}: ProductCardCartProps) => {
  // const normolizeTotalPrice = parseFloat(product.totalPrice).toFixed(2);
  const normolizeTotalPrice = product.totalPrice;

  const isMobileAndTab = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <>
      {isMobileAndTab && <p className={css.productName}>{product.name}</p>}
      <div className={css.cardThumb}>
        <div className={css.imgThumb}>
          <Image
            width={300}
            height={300}
            className={css.img}
            src={product.img}
            alt="Meal"
          />
        </div>
        <div>
          {!isMobileAndTab && <p className={css.productName}>{product.name}</p>}
          {isMobileAndTab ? (
            <>
              <p className={css.productPrice}>
                {product.price} $ x {product.qty}
              </p>
              <p className={css.productPrice}>{normolizeTotalPrice} $</p>
            </>
          ) : (
            <p className={css.productPrice}>
              {product.price} x {product.qty} = {normolizeTotalPrice} $
            </p>
          )}
          <div className={css.counterWrap}>
            <div className={css.countBtn} onClick={() => onMinusBtn(product)}>
              <AiFillMinusCircle size={22} color="#2196f3" />
            </div>
            <span className={css.counterNum}>{product.qty}</span>
            <div className={css.countBtn} onClick={() => onPlusBtn(product)}>
              <AiFillPlusCircle size={22} color="#2196f3" />
            </div>
          </div>
          <button
            className={css.removeBtn}
            onClick={() => onRemoveProduct(product._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};
