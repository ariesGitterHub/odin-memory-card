import styles from "../styles/Modal.module.css"; //
import Button from "../utils/Button";

export default function Modal({ message, onReset }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{message}</h2>
        <div className={styles.modalButtons}>
          <Button onClick={onReset}>Reset Game</Button>
        </div>
      </div>
    </div>
  );
}
