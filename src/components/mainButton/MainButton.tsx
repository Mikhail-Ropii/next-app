import css from "./styles.module.css";

interface MainButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const MainButton = ({
  children,
  onClick,
  disabled = false,
}: MainButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={css.btn}
    >
      {children}
    </button>
  );
};
