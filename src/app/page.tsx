import styles from "./page.module.css";
import { Layout } from "@/components/layout/Layout";

export default function Home() {
  return (
    <main className={styles.main}>
      <Layout />
    </main>
  );
}
