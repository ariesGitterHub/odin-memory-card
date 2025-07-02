import styles from "../styles/Button.module.css";

export default function Button({
  variant = "default",
  type,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
