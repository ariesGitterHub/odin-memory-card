import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CardTile from "./utils/CardTile";
import { fetchWithHandling } from "./services/api";
import { cardData } from "./data/data";

export default function App() {
  const url = "";

  return (
    <div className="app-container">
      <Header />
      <div className="card-container">
        {cardData.map((card) => (
          <div key={card.id}>
            <CardTile imageUrl={card.imageUrl} />
            </div>
        ))}
      </div>
    </div>
  );
}
