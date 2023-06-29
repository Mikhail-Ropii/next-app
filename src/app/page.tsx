import styles from "./page.module.css";
import { ShopPage } from "@/components/shopPage/ShopPage";

export default function Home() {
  return (
    <main className={styles.main}>
      <ShopPage />
    </main>
  );
}
