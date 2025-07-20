export default function Square({ value, onClick, disableClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "win" : ""}`}
      onClick={onClick}
      disabled={disableClick}
    >
      {value}
    </button>
  );
}
