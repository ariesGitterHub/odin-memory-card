import Image from "./Image";
import imgCardBack from "../assets/cardBack.jpg";

export default function CardTile({
  imageUrl,
  imageCardName,
  handleClickedCards,
  isFlipping,
}) {
  return (
    <div
      className={`${isFlipping ? "flipping" : ""} card-tile card-img`}
      tabIndex={0}
      role="button"
      aria-label={`Card: ${imageCardName}`}
      onClick={handleClickedCards}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // Note space scrolling prevention
          handleClickedCards();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <Image src={imageUrl} alt={imageCardName} />
        </div>
        <div className="card-back">
          <Image src={imgCardBack} alt="Tarot card back" />
        </div>
      </div>
    </div>
  );
}
