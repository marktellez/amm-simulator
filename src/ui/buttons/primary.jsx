import Button from "./";
import styles from "./styles.module.css";

export default function PrimaryButton({ children, ...rest }) {
  return (
    <Button className={styles.primary} {...rest}>
      {children}
    </Button>
  );
}
