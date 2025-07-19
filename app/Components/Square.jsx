import React from "react";

export default function Square({ value, onClick, disableClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "winning" : ""}`}
      disabled={disableClick}
      onClick={onClick}
      style={{
        color: value === "X" ? "green" : value === "O" ? "red" : "black",
        fontSize: "8rem",
      }}
    >
      {value}
    </button>
  );
}