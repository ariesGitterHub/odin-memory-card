import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CardTile from "./utils/CardTile";
// import { fetchWithHandling } from "./services/api";
// import { cardData } from "./data/data";

// export default function App() {
//   const [imageSrc, setImageSrc] = useState("");

//   // const tarotUrl = "https://rws-deck.netlify.app/.netlify/functions/cards";
//   // https://rws-deck.netlify.app/.netlify/functions/cards

//   const API_BASE = import.meta.env.DEV
//     ? "/api"
//     : "https://rws-deck.netlify.app/.netlify/functions";

//   useEffect(() => {
//     async function fetchImage() {
//       try {
//         const response = await fetch(`${API_BASE}/cards`);
//         const data = await response.json();
//         if (data.cards && data.cards.length > 0) {
//           setImageSrc(data.cards[0].image); // Or use data.cards[0].name if testing text
//         } else {
//           console.error("No cards returned from API");
//         }
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     }
//     fetchImage();
//   }, []);

//   return (
//     <div className="app-container">
//       <Header />
//       <div className="card-container">
//         {cardData.map((card) => (
//           <div key={card.id}>
//             <CardTile imageUrl={imageSrc} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function App() {
  const [cardData, setCardData] = useState([]);
  // const [imageSrc1, setImageSrc1] = useState(null);
  // const [imageSrc2, setImageSrc2] = useState(null);
  // const [imageSrc3, setImageSrc3] = useState(null);
  // const [imageSrc4, setImageSrc4] = useState(null);
  // const [imageSrc5, setImageSrc5] = useState(null);

  // const cardData = [
  //   {
  //     id: 1,
  //     imageUrl: imageSrc1,
  //   },
  //   {
  //     id: 2,
  //     imageUrl: imageSrc2,
  //   },
  //   {
  //     id: 3,
  //     imageUrl: imageSrc3,
  //   },
  //   {
  //     id: 4,
  //     imageUrl: imageSrc4,
  //   },
  //   {
  //     id: 5,
  //     imageUrl: imageSrc5,
  //   },
  // ];

  // const cardData = [];
  // const cardData = [];

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
        // console.log("Fetched data:", data); // should be an array

        const cards = data.cards;

        if (cards && cards.length > 0) {
          // const randomCard1 = cards[Math.floor(Math.random() * cards.length)];
          // const randomCard2 = cards[Math.floor(Math.random() * cards.length)];
          // const randomCard3 = cards[Math.floor(Math.random() * cards.length)];
          // const randomCard4 = cards[Math.floor(Math.random() * cards.length)];
          // const randomCard5 = cards[Math.floor(Math.random() * cards.length)];
          // setImageSrc(cards[13].image);
          // setImageSrc1(randomCard1.image);

          // setImageSrc2(randomCard2.image);
          // setImageSrc3(randomCard3.image);
          // setImageSrc4(randomCard4.image);
          // setImageSrc5(randomCard5.image);

          //  cardData = [{...cards}];
          //  console.log(cardData);

          setCardData(cards);
          // const shuffled = cards.sort(() => 0.5 - Math.random());
          // setCardData(shuffled.slice(0, 5)); // get 5 random cards

        } else {
          console.error("No cards returned from API");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
  }, []);


  

  return (
    <div className="app-container">
      <Header />
      <div className="card-container">
        {cardData.map((card) => (
          <div key={card.name}>
               {/* <CardTile imageUrl={imageSrc} /> */}
            <CardTile imageUrl={card.image} />
          </div>
        ))}
      </div>
    </div>
  );
}