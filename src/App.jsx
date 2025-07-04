import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import ScoreBar from "./components/ScoreBar";
import Modal from "./components/Modal";
import { cardMessages } from "./data/data";
import Button from "./utils/Button";
import CardTile from "./utils/CardTile";

export default function App() {
  const [cardData, setCardData] = useState([]); // all 78 tarot cards
  const [visibleCards, setVisibleCards] = useState([]); // Number equal to cardNumber
  const [clickedCards, setClickedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  // const [showModalResetGame, setShowModalResetGame] = useState(false);
  // const [showModalGameDirections, setShowModalGameDirections] = useState(false);
  // const [modalHeading, setModalHeading] = useState("");
  // const [modalMessage, setModalMessage] = useState("");
  // NOTE: Use the state below and elsewhere as a better example of how to consolidate code, as opposed to above state, keep as a note to future self
  const [showModal, setShowModal] = useState({
    show: false,
    type: null,
    heading: "",
    message: "",
  });

  const [flipTrigger, setFlipTrigger] = useState(false);

  const cardNumber = 12;
  const clickedCardsArray = Array.from(clickedCards);
  const lastCardInSet = clickedCardsArray[clickedCardsArray.length - 1]; // The last card will be the winning card
  // const matchedCardFortune = cardMessages.find(
  //   (card) => card.name === lastCardInSet
  // );

  // NOTE: Changed below to now use useMemo in case later code changes use a larger dataset and make this computation more expensive
  const matchedCardFortune = useMemo(
    () => cardMessages.find((card) => card.name === lastCardInSet),
    [lastCardInSet]
  );

  const gameDirectionsHeading = "Game Directions";
  // NOTE: Below, is a good reminder that I can use jsx instead of a string so that I can apply css for effects
  const gameDirectionsMessage = (
    <>
      This is a test of memory. You may click each card only once. If a card is
      clicked more than once, you lose. After a card is clicked during a game,
      the cards shown will flip and reshuffle.{" "}
      <span className="modal-card-red">
        Upon a perfect match, the winning card will reveal a daily fortune to
        you.
      </span>{" "}
      Good luck.
    </>
  );
  const winHeading = "You Win!";
  const winMessage = (
    <>
      Your winning card:{" "}
      <span className="modal-card-name">{lastCardInSet}</span>, with your daily
      fortune:{" "}
      <span className="modal-card-fortune">
        "{matchedCardFortune?.message || "No message found."}"
      </span>
    </>
  );
  const loseHeading = "Game Over!";
  const loseMessage = "You clicked the same card twice. Better luck next time.";

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
          setVisibleCards(getRandomCards(data.cards));
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
  }, []);

  useEffect(() => {
    if (currentScore === cardNumber) {
      // setModalHeading(winHeading);
      // setModalMessage(winMessage);
      // setShowModalResetGame(true);
      setShowModal({
        show: true,
        type: "win",
        heading: winHeading,
        message: winMessage,
      });
    }
  }, [currentScore]);

  // NOTE: This will only log in development and seeing what I picked already serves as a shortcut for testing
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("Clicked cards so far (for cheaters):", [...clickedCards]);
    }
  }, [clickedCards]);

  // NOTE: Helper to get cardNumber random cards from full deck
  function getRandomCards(deck) {
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cardNumber);
  }

  // NOTE: Shuffles current visible cardNumber of cards only using Fisher–Yates Shuffle algorithm
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
        // setModalHeading(loseHeading);
        // setModalMessage(loseMessage);
        // setShowModalResetGame(true);
        setShowModal({
          show: true,
          type: "loss",
          heading: loseHeading,
          message: loseMessage,
        });
        setCurrentScore(0);
        return new Set(); // NOTE: Clears clicked cards for new game, essentially the same as setClickedCards(new Set());, but a better option
      } else {
        const updated = new Set(prevClicked);
        updated.add(cardId);
        setCurrentScore((prevScore) => prevScore + 1);
        setFlipTrigger(true);
        reshuffleVisibleCards(); // NOTE: Shuffles same carNumber of cards in new order

        setTimeout(() => {
          setFlipTrigger(false); // NOTE: Resets after animation
        }, 500);
        return updated;
      }
    });
  }

  function handleHighScoreUpdate(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }

  function handleResetGame() {
    setCurrentScore(0);
    // setShowModal(false);
    setShowModal({ show: false, type: null, heading: "", message: "" });

    setVisibleCards(getRandomCards(cardData)); // New cardNumber of random cards
    setClickedCards(new Set());
  }

  function handleCloseModal() {
    // setShowModal(false);
    setShowModal({ show: false, type: null, heading: "", message: "" });
  }

  function handleGameDirections() {
    // setModalHeading(gameDirectionsHeading);
    // setModalMessage(gameDirectionsText);
    // setShowModalGameDirections(true);
    setShowModal({
      show: true,
      type: "game-directions",
      heading: gameDirectionsHeading,
      message: gameDirectionsMessage,
    });
  }

  return (
    <div className="app-container">
      <Header />
      <Button variant="directions" onClick={handleGameDirections}>
        Game Directions
      </Button>
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
              imageCardName={card.name}
              handleClickedCards={() => handleClickedCards(card.name)}
              isFlipping={flipTrigger}
            />
          </div>
        ))}
      </div>
      {/* {showModalResetGame && (
        <Modal
          heading={modalHeading}
          message={modalMessage}
          onReset={handleResetGame}
        />
      )}
      {showModalGameDirections && (
        <Modal
          type="game-directions"
          heading={modalHeading}
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )} */}
      {showModal.show && (
        <Modal
          type={showModal.type}
          heading={showModal.heading}
          message={showModal.message}
          onReset={handleResetGame}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
