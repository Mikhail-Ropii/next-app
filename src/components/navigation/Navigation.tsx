import css from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <>
      <Link
        href="/"
        className={pathname === "/" ? `${css.active}` : `${css.link}`}
      >
        Shop
      </Link>
      <Link
        href="/cart"
        className={pathname === "/cart" ? `${css.active}` : `${css.link}`}
      >
        Cart
      </Link>
      <Link
        href="/history"
        className={pathname === "/history" ? `${css.active}` : `${css.link}`}
      >
        History
      </Link>
    </>
  );
};
