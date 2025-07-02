import { useState, useEffect } from "react";
import Header from "./components/Header";
import ScoreBar from "./components/ScoreBar";
import CardTile from "./utils/CardTile";
import Modal from "./components/Modal";
import imgCardBack from "./assets/cardBack.jpg";


export default function App() {
  const [cardData, setCardData] = useState([]); // all 78
  const [visibleCards, setVisibleCards] = useState([]); // just 3
  const [clickedCards, setClickedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [animateShuffle, setAnimateShuffle] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);


  const cardNumber = 3;

  const API_BASE = import.meta.env.DEV
    ? "/api"
    : "https://rws-deck.netlify.app/.netlify/functions";

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(`${API_BASE}/cards`);
        const data = await response.json();
        if (data.cards && data.cards.length > 0) {
          setCardData(data.cards);
          setVisibleCards(getRandomCards(data.cards)); // set initial 3
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
  }, []);

  // helper to get 3 random cards from full deck
  function getRandomCards(deck) {
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cardNumber);
  }

  // shuffle current visible 3 cards only
  function reshuffleVisibleCards() {
    const shuffled = [...visibleCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVisibleCards(shuffled);
  }

  function handleClickedCards(cardId) {
    setClickedCards((prevClicked) => {
      const hasBeenClicked = prevClicked.has(cardId);

      if (hasBeenClicked) {
        setModalMessage("Sorry, you lost...");
        setShowModal(true);
        setCurrentScore(0);
        return new Set(); // reset clicked state
      } else {
        const updated = new Set(prevClicked);
        updated.add(cardId);
        setCurrentScore((prevScore) => prevScore + 1);
        // setAnimateShuffle(true); // Trigger animation
        setIsFlipping(true); // Trigger flip
        reshuffleVisibleCards(); // shuffle same 3 cards in new order
        setTimeout(() => {
          setIsFlipping(false); // Reset after animation
        }, 600); // match .6s in CSS
        return updated;
      }
    });
  }

  useEffect(() => {
    if (currentScore === cardNumber) {
      setModalMessage("Congratulations, you won!");
      setShowModal(true);
    }
  }, [currentScore]);

  function handleHighScoreUpdate(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }

  function handleResetGame() {
    setCurrentScore(0);
    setClickedCards(new Set());
    setShowModal(false);
    setVisibleCards(getRandomCards(cardData)); // 👈 new 3 random cards
  }

  // useEffect(() => {
  //   if (animateShuffle) {
  //     const timeout = setTimeout(() => {
  //       setAnimateShuffle(false);
  //     }, 500); // duration of your animation

  //     return () => clearTimeout(timeout);
  //   }
  // }, [animateShuffle]);
  

  return (
    <div className="app-container">
      <Header />
      <ScoreBar
        currentScore={currentScore}
        cardNumber={cardNumber}
        highScore={highScore}
        handleHighScoreUpdate={handleHighScoreUpdate}
      />
      <div className="card-container">
        {visibleCards.map((card) => (
          <div key={card.name}>
            <CardTile
              imageUrl={card.image}
              handleClickedCards={() => handleClickedCards(card.name)}
              isFlipping={isFlipping}
            />
          </div>
        ))}
      </div>
      {showModal && <Modal message={modalMessage} onReset={handleResetGame} />}
    </div>
  );
}
