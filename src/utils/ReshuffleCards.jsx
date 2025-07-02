export default function ReshuffleDeck(array) {

      const newArray = [...array]; // Create a shallow copy to avoid mutating the original
      let currentIndex = newArray.length;
      let randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
          newArray[randomIndex],
          newArray[currentIndex],
        ];
      }
      return newArray;

}