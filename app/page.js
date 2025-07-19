"use client";
import Square from "./Components/Square";
import { useState } from "react";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState("");
  const [winningSquares, setWinningSquares] = useState([]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleSquareClick = (index) => {
    if (squares[index] || winner) return;

    const updatedSquares = [...squares];
    updatedSquares[index] = isXNext ? "X" : "O";
    setSquares(updatedSquares);
    setIsXNext(!isXNext);

    const result = checkWinner(updatedSquares);
    if (result) {
      setWinner(result.symbol);
      setWinningSquares(result.line);
    } else if (updatedSquares.every((val) => val !== null)) {
      // It's a draw
      setTimeout(() => {
        alert("It's a draw!");
        handleBoardReset();
      }, 100);
    }
  };

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return { symbol: board[a], line: combination };
      }
    }
    return null;
  };

  const handleBoardReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner("");
    setWinningSquares([]);
  };

  const displayWinner = () => {
    if (winner) {
      return (
        <>
          <h1>The Winner is player {winner}</h1>
          <div className="reset-button">
            <button onClick={handleBoardReset}>Reset</button>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="container">
        {!winner && <h1 className="player">Player {isXNext ? "X" : "O"}</h1>}

        <div className="board">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleSquareClick(index)}
              disableClick={Boolean(winner)}
              isWinning={winningSquares.includes(index)}
            />
          ))}
        </div>

        <div className="game-info">{displayWinner()}</div>
      </div>
    </>
  );
}
