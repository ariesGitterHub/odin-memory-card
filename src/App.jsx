import { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import ScoreBar from "./components/ScoreBar";
import CardTile from "./utils/CardTile";
// import { fetchWithHandling } from "./services/api";
// import { cardData } from "./data/data";


export default function App() {
  const [cardData, setCardData] = useState([]);

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

const copyCardData = [...cardData];
const shuffled = copyCardData.sort(() => 0.5 - Math.random());
const selectedNumber = shuffled.slice(0, 12);

  return (
    <div className="app-container">
      <Header />
      <ScoreBar />
      <div className="card-container">
        {/* {cardData.map((card) => ( */}
        {selectedNumber.map((card) => (
          <div key={card.name}>
            {/* <CardTile imageUrl={imageSrc} /> */}
            <CardTile imageUrl={card.image} />
          </div>
        ))}
      </div>
    </div>
  );
}