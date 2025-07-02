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

export default function CardTile({ imageUrl, handleClickedCards, isFlipping }) {
  return (
    <div
      className={`card-tile ${isFlipping ? "flipping" : ""}`}
      onClick={handleClickedCards}
    >
      <div className="card-inner">
        <div className="card-back"></div>
        <div className="card-front">
          <img src={imageUrl} alt="Card" />
        </div>
      </div>
    </div>
  );
}
