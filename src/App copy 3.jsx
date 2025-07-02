import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import ScoreBar from "./components/ScoreBar";
import CardTile from "./utils/CardTile";
// import { fetchWithHandling } from "./services/api";
// import { cardData } from "./data/data";
import Modal from "./components/Modal";
import ReshuffleDeck from "./utils/ReshuffleCards";

export default function App() {
  const [cardData, setCardData] = useState([]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [postWinOrLoss, setPostWinOrLoss] = useState(false);
  const [reshuffleExistingCards, setReshuffleExistingCards] = useState(false);

  const API_BASE = import.meta.env.DEV
    ? "/api"
    : "https://rws-deck.netlify.app/.netlify/functions";

  // useEffect(() => {
  //   async function fetchImage() {
  //     try {
  //       const res = await fetch(`${API_BASE}/cards`);
  //       const data = await res.json();
  //       console.log("Fetched data:", data); // <--- Add this line
  //       if (data.cards?.length) {
  //         setImageSrc(data.cards[0].image);
  //       } else {
  //         console.error("No cards returned");
  //       }
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //     }
  //   }

  //   fetchImage();
  // }, []);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(`${API_BASE}/cards`);
        const data = await response.json();
        const cards = data.cards;

        if (cards && cards.length > 0) {
          setCardData(cards);
        } else {
          console.error("No cards returned from API");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
  }, []);

  const cardNumber = 3;

  // Below, prevent re-renders using useMemo, also don't reshuffle cards in the body of the component — it causes re-renders and inconsistency.
  const selectedCardsFromCardData = useMemo(() => {
    if (!postWinOrLoss) {
      const copyCardData = [...cardData];
      const shuffled = copyCardData.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, cardNumber);
    } else {
      const copyCardData = [...cardData];
      const shuffled = copyCardData.sort(() => 0.5 - Math.random());
      setPostWinOrLoss(false);
      return shuffled.slice(0, cardNumber);
    }
  }, [cardData, postWinOrLoss]);

  function handleClickedCards(cardId) {
    setClickedCards((prevClicked) => {
      const hasBeenClicked = prevClicked.has(cardId);

      if (hasBeenClicked) {
        setModalMessage("Sorry, you lost...");
        setShowModal(true);
        setCurrentScore(0);
        setReshuffleExistingCards(false)
        return new Set(); 
      } else {
        setReshuffleExistingCards(true)
        setCurrentScore((prevScore) => prevScore + 1);
        const updated = new Set(prevClicked);
        updated.add(cardId);
        return updated;
      }
    });
  }

  function handleHighScoreUpdate(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore); // Update high score only if the new score is higher
    }
  }

  // Trigger modal when score reaches cardNumber (win)
  useEffect(() => {
    if (currentScore === cardNumber) {
      setModalMessage("Congratulations, you won!");
      setShowModal(true);
      // setPostWinOrLoss(true);
    }
  }, [currentScore, cardNumber]);

  function handleResetGame() {
    setCurrentScore(0);
    setClickedCards(new Set());
    setShowModal(false); // Close the modal after reset
    setPostWinOrLoss(true);
  }

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
        {selectedCardsFromCardData.map((card) => (
          <div key={card.name}>
            <CardTile
              imageUrl={card.image}
              handleClickedCards={() => handleClickedCards(card.name)}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          message={modalMessage}
          onReset={handleResetGame}
        />
      )}
    </div>
  );
}
