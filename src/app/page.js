"use client";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-32 h-32 border text-amber-400 bg-gray-100 border-yellow-700 flex items-center justify-center text-9xl font-bold hover:bg-gray-300 transition"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((square) => square !== null);

  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else if (isBoardFull) {
    status = "Empate 🤝";
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-xl font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Ir al movimiento #" + move : "Volver al inicio";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="text-white hover:bg-amber-500 rounded-lg bg-amber-400 font-bold px-4 py-2"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Título*/}
      <h1 className="text-4xl font-bold mb-10 text-amber-400 text-center">
        Triqui de Jaider
      </h1>

      {/* Tablero + Historial alineados */}
      <div className="flex gap-12">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info flex flex-col justify-center">
          <h2 className="text-2xl mb-4 text-amber-300">Historial</h2>
          <ol className="space-y-3">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
