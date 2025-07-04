import styles from "../styles/Modal.module.css"; //
import Button from "../utils/Button";

export default function Modal({ heading, message, onReset, onClose, type }) {
  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div className={styles.modal}>
        <h2 id="modal-heading">{heading}</h2>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          {type === "game-directions" ? (
            <Button onClick={onClose}>Close Game Directions</Button>
          ) : (
            <Button onClick={onReset}>Reset Game</Button>
          )}
        </div>
      </div>
    </div>
  );
}
