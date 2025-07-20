"use client";
import Square from "./Components/Square";
import { useState } from "react";

export default function Home() {
  const initialBoard = Array(9).fill("");

  const [board, setBoard] = useState(initialBoard);
  const [current, setCurrent] = useState("X");
  const [gameStatus, setGameStatus] = useState("Player X's Turn");
  const [winningLine, setWinningLine] = useState([]);

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWin = (newBoard) => {
    for (let combo of winCombos) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return combo;
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameStatus.includes("Wins") || gameStatus === "Draw!") return;

    const updatedBoard = [...board];
    updatedBoard[index] = current;

    const winnerCombo = checkForWin(updatedBoard);

    if (winnerCombo) {
      setBoard(updatedBoard);
      setWinningLine(winnerCombo);
      setGameStatus(`Player ${current} Wins!`);
    } else if (updatedBoard.every((cell) => cell !== "")) {
      setBoard(updatedBoard);
      setGameStatus("Draw!");
    } else {
      setBoard(updatedBoard);
      setCurrent(current === "X" ? "O" : "X");
      setGameStatus(`Player ${current === "X" ? "O" : "X"}'s Turn`);
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setCurrent("X");
    setGameStatus("Player X's Turn");
    setWinningLine([]);
  };

  return (
    <div className="wrapper">
      <h2 className="title">ACA-Tic Tac Toe</h2>
      <p className="status">{gameStatus}</p>

      <div className="board-grid">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinning={winningLine.includes(index)}
            disableClick={Boolean(value) || gameStatus.includes("Wins") || gameStatus === "Draw!"}
          />
        ))}
      </div>

      <button className="reset-btn" onClick={resetBoard}>New Game</button>
    </div>
  );
}
