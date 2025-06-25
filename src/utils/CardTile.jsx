export default function CardTile({ imageUrl }) {
  //console.log("Rendering imageUrl: ", imageUrl); // Log to see what value you're getting
  return (
    <div className="card-tile">
      <p>{imageUrl || "No image URL provided"}</p>
    </div>
  );
}
