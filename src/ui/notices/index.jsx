import Spinner from "@/ui/page/spinner";
import styles from "./styles.module.css";

export default function Notice({ type, children }) {
  return (
    <div
      className={`p-4 font-medium flex items-center justify-center space-x-4 ${styles[type]}`}>
      <div>{children}</div>
      <div>
        <Spinner className="h-4 w-4" />
      </div>
    </div>
  );
}
