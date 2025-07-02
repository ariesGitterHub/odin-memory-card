import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import ScoreBar from "./components/ScoreBar";
import CardTile from "./utils/CardTile";
import Modal from "./components/Modal";

export default function App() {
  const [cardData, setCardData] = useState([]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [shuffledSelectedCards, setShuffledSelectedCards] = useState([]);
  const [gameReset, setGameReset] = useState(false); // New state to trigger game reset
  const [needsReshuffle, setNeedsReshuffle] = useState(false);

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
        } else {
          console.error("No cards returned from API");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
    fetchImage();
  }, []);

  // UseMemo to select a fixed set of cards based on cardData
  const selectedCardsFromCardData = useMemo(() => {
    const shuffled = [...cardData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cardNumber);
  }, [cardData]);

  // Shuffle the selected cards (reorder their display)
  const shuffleSelectedCards = (cards) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle click on card
  function handleClickedCards(cardId) {
    setClickedCards((prevClicked) => {
      const hasBeenClicked = prevClicked.has(cardId);

      if (hasBeenClicked) {
        setModalMessage("Sorry, you lost...");
        setShowModal(true);
        setCurrentScore(0);
        // setGameReset(true);
        setClickedCards(new Set()); // reset clicked state
        return new Set(); // reset clicked state
      } else {
        setCurrentScore((prevScore) => prevScore + 1);
        const updated = new Set(prevClicked);
        updated.add(cardId);

        // Reshuffle the selected cards only if it's the first click
        if (!hasBeenClicked) {
          setNeedsReshuffle(true); // Trigger reshuffle flag
        }

        return updated;
      }
    });
  }

  // Trigger reshuffling only the displayed selected cards
  useEffect(() => {
    if (needsReshuffle) {
      const reshuffledCards = shuffleSelectedCards(selectedCardsFromCardData); // Shuffle only the selected cards
      setShuffledSelectedCards(reshuffledCards); // Update shuffled cards state
      setNeedsReshuffle(false); // Reset reshuffle flag
    }
  }, [needsReshuffle, selectedCardsFromCardData]);

  useEffect(() => {
    if (gameReset) {
      const newSelected = selectedCardsFromCardData; // Already memoized
      const reshuffled = shuffleSelectedCards(newSelected);
      setShuffledSelectedCards(reshuffled);
      setGameReset(false); // ✅ reset flag
    }
  }, [gameReset, selectedCardsFromCardData]);
  

  console.log(selectedCardsFromCardData);
  
  // Trigger new cards is gameReset(true)
  useEffect(() => {}, []);

  function handleHighScoreUpdate(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore); // Update high score only if the new score is higher
    }
  }

  // Trigger modal when score reaches cardNumber (win)
  useEffect(() => {
    if (currentScore === cardNumber) {
      // setGameReset(true);
      setModalMessage("Congratulations, you won!");
      setShowModal(true);
    }
  }, [currentScore, cardNumber]);

  // useEffect(() => {
  //   if (showModal) {
  //     setShuffledSelectedCards([]); // hide current cards
  //   }
  // }, [showModal]);
  

  function handleResetGame() {
    setCurrentScore(0);
    setGameReset(true);
    setClickedCards(new Set());
    setShowModal(false); // Close the modal after reset
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
        {/* Display shuffled cards */}
        {shuffledSelectedCards.length > 0
          ? shuffledSelectedCards.map((card) => (
              <div key={card.name}>
                <CardTile
                  imageUrl={card.image}
                  handleClickedCards={() => handleClickedCards(card.name)}
                />
              </div>
            ))
          : selectedCardsFromCardData.map((card) => (
              <div key={card.name}>
                <CardTile
                  imageUrl={card.image}
                  handleClickedCards={() => handleClickedCards(card.name)}
                />
              </div>
            ))}
      </div>
      {showModal && <Modal message={modalMessage} onReset={handleResetGame} />}
    </div>
  );
}
