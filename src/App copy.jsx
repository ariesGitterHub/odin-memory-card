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

  // const copyCardData = [...cardData];
  // const shuffled = copyCardData.sort(() => 0.5 - Math.random());
  //  const selectedNumber = shuffled.slice(0, cardNumber);

  // Below, prevent re-renders using useMemo, also don't reshuffle cards in the body of the component — it causes re-renders and inconsistency.
  const selectedNumber = useMemo(() => {
    const copyCardData = [...cardData];
    const shuffled = copyCardData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cardNumber);
  }, [cardData]);

  // console.log(selectedNumber);

  function handleClickedCards(cardId) {
    setClickedCards((prevClicked) => {
      const hasBeenClicked = prevClicked.has(cardId);
      
      if (hasBeenClicked) {
          setModalMessage("Sorry, you lost...");
          setShowModal(true);
          setCurrentScore(0);
        return new Set(); // reset clicked state
      } else {
          setCurrentScore((prevScore) => prevScore + 1);
        const updated = new Set(prevClicked);
        updated.add(cardId);
        return updated;
      }
    });
  }


  // function handleHighScore(newHighScore) {
  //   setCurrentScore(newHighScore)
  //   if (newHighScore > highScore) {
  //     setHighScore(newHighScore);
  //   }
  // }

  // function handleHighScoreUpdate(newScore) {
  //   setCurrentScore(newScore)
  //   if (newScore > highScore) {
  //     setHighScore(newScore)
  //   }
  // }

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
    } 
    // else if (currentScore === 0 && clickedCards.size !== 0) {
    //   setModalMessage("Sorry, you lost...");
    //   setShowModal(true);
    // }
  }, [currentScore, cardNumber]);

  // function handleCloseModal() {
  //   setShowModal(false);
  // }

  function handleResetGame() {
    setCurrentScore(0);
    setClickedCards(new Set());
    setShowModal(false); // Close the modal after reset
    
  }

  // function handleGamePlay(isClicked) {

  // }

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
        {/* {cardData.map((card) => ( */}
        {selectedNumber.map((card) => (
          <div key={card.name}>
            {/* <CardTile imageUrl={imageSrc} /> */}
            <CardTile
              imageUrl={card.image}
              handleClickedCards={() => handleClickedCards(card.name)}
            />
          </div>
        ))}
      </div>
      {/* Render the modal based on the state */}
      {showModal && (
        <Modal
          message={modalMessage}
          // onClose={handleCloseModal}
          onReset={handleResetGame}
        />
      )}
    </div>
  );
}
