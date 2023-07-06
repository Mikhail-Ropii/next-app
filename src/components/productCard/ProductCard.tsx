import css from "./styles.module.css";
import Image from "next/image";
import { Product } from "@/models/product";

//Components
import { MainButton } from "../mainButton/MainButton";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: (_id: string) => boolean;
}

export const ProductCard = ({
  product,
  onAddToCart,
  isInCart,
}: ProductCardProps) => {
  const isDisable = isInCart(product._id);
  return (
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
      <p className={css.productName}>{product.name}</p>
      <p className={css.productPrice}>{product.price} $</p>
      <div className={css.btnWrap}>
        <div className={css.btn}>
          <MainButton disabled={isDisable} onClick={() => onAddToCart(product)}>
            {isDisable ? "In cart" : "Add to cart"}
          </MainButton>
        </div>
      </div>
    </div>
  );
};
