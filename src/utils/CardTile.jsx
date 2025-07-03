// export default function CardTile({ imageUrl }) {
//   //console.log("Rendering imageUrl: ", imageUrl); // Log to see what value you're getting
//   return (
//     <div className="card-tile">
//       <p>{imageUrl || "No image URL provided"}</p>
//     </div>
//   );
// }


// export default function CardTile({ imageUrl, handleClickedCards }) {
//   return (
//     <div className="card-tile" onClick={handleClickedCards}>
//       <img src={imageUrl} alt="Random Tarot card" />
//     </div>
//   );
// }

// utils/CardTile.jsx

// import "../styles/CardTile.module.css";

// export default function CardTile({ imageUrl, handleClickedCards, isFlipping }) {
//   return (
//     <div className={`card-tile ${isFlipping ? "flipping" : ""}`} onClick={handleClickedCards}>
//       <div className="card-inner">
//         <div className="card-back"></div>
//         <div className="card-front">
//           <img src={imageUrl} alt="Card" />
//         </div>
//       </div>
//     </div>
//   );
// }

// import styles from "../styles/CardTile.module.css";
import Image from "./Image";
import imgCardBack from "../assets/cardBack.jpg";

export default function CardTile({ imageUrl, imageCardName, handleClickedCards, isFlipping }) {
  return (
    <div
      // className={styles.cardTile}
      // className={`${styles.cardTile} ${isFlipping ? styles.flipping : ""}`}
      // className={`${styles.cardTile} ${
      //   isFlipping ? styles.flipping : ""
      // } card-tile card-img`}
      className={`${isFlipping ? "flipping" : ""} card-tile card-img`}
      tabIndex={0}
      role="button"
      onClick={handleClickedCards}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // space scroll prevention
          handleClickedCards();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <Image src={imageUrl} alt={imageCardName} />
        </div>
        {/* <div className={styles.cardBack}> */}
        <div className="card-back">
          <Image src={imgCardBack} alt="Tarot card back" />
        </div>
      </div>
    </div>
  );
}
