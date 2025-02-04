import styles from "./Button.module.scss";
import { clsx } from "clsx";
export const Button = ({
  label,
  variant = "primary",
  handleOnClick,
}: {
  label: string;
  variant: "primary" | "secondary";
  handleOnClick: () => void;
}) => {

    const buttonclasses = clsx(styles.button, styles[variant])
  return <button className={buttonclasses} onClick={handleOnClick}>{label}</button>;
};
