import css from "./styles.module.css";
import { Container } from "../container/Container";
import { Navigation } from "../navigation/Navigation";

export const Header = () => {
  return (
    <Container>
      <div className={css.headerWrap}>
        <Navigation />
      </div>
    </Container>
  );
};
