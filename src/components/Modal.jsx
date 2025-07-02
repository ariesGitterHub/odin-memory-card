// Modal.jsx
// import React from "react";
// import "./Modal.css"; // Optional for custom styles
import Button from "../utils/Button";

export default function Modal({ message, onClose, onReset }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{message}</h2>
        <div className="modal-actions">
          {/* <Button onClick={onClose}>Close</Button> */}
          <Button onClick={onReset}>Reset Game</Button>
        </div>
      </div>
    </div>
  );
}
