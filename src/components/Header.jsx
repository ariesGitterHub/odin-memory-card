import styles from "../styles/Header.module.css";
import imgLogo from "../assets/favIcon.svg";
import Image from "../utils/Image";

export default function Header() {
  const currentYear = new Date().getFullYear();
  const MMM = `A Mad Muffin Man Design © ${currentYear}`;

  return (
    <header className={styles.header}>
      <div className={styles.innerHeaderContainer}>
        <Image
          src={imgLogo}
          alt="Sun in splendor logo"
          className={styles.headerLogo}
        />
        <div className={styles.textContainer}>
          <h1>Mystical Memory Game</h1>
          <p>{MMM}</p>
        </div>
        <Image
          src={imgLogo}
          alt="Sun in splendor logo"
          className={styles.headerLogo}
        />
      </div>
    </header>
  );
}
