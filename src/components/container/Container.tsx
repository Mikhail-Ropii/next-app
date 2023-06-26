import css from "./styles.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};
