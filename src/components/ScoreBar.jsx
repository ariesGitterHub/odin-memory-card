import styles from "../styles/ScoreBar.module.css";

export default function ScoreBar() {

  return (
    <div className={styles.scoreBarDiv}>
      <div className={styles.textContainer}>
        <p>Current Score:</p>
        <p>XX</p>
      </div>
      <div className={styles.textContainer}>
        <p>Best Score:</p>
        <p>YY</p>
      </div>
    </div>
  );
}