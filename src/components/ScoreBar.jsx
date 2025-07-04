import { useEffect } from "react";
import styles from "../styles/ScoreBar.module.css";

export default function ScoreBar({
  currentScore,
  cardNumber,
  highScore,
  handleHighScoreUpdate,
}) {
  useEffect(() => {
    // Note: If current score exceeds high score, update the high score
    if (currentScore > highScore) {
      handleHighScoreUpdate(currentScore); // Triggers high score update
    }
  }, [currentScore, highScore, handleHighScoreUpdate]);

  return (
    <div className={styles.scoreBarDiv}>
      <div className={styles.textContainer}>
        <p>Current Score:</p>
        <p>
          {currentScore}/{cardNumber}
        </p>
      </div>
      <div className={styles.textContainer}>
        <p>High Score:</p>
        <p>{highScore}</p>
      </div>
    </div>
  );
}
