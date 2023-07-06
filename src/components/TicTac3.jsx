import React, { useEffect, useState } from "react";
import { Oicon, Xicon } from "./icons";

const Player = {
  X: <Xicon />,
  O: <Oicon />,
};

const TicTac3 = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(Player.X);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
  };

  const checkWinner = () => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells([a, b, c]);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setIsDraw(true);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player.X);
    setWinner(null);
    setIsDraw(false);
    setWinningCells([]);
  };

  const renderCell = (index) => {
    const isWinningCell = winningCells.includes(index);

    return (
      <div
        key={index}
        className={`flex p-2 active:scale-95 duration-150 justify-center items-center h-20 border border-gray-400 rounded cursor-pointer font-bold ${isWinningCell ? "text-green-500 bg-green-950/30 border-green-600" : "text-blue-200"}`}
        onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  return (
    <div className=" text-white flex justify-center items-center py-10 mt-16">
      <div className="w-64">
        <h2 className="text-center mb-4 text-xl md:text-2xl">Tic Tac Toe</h2>
        <div className="grid grid-cols-3 gap-2">{board.map((_, index) => renderCell(index))}</div>
        {winner && (
          <div className="text-center mt-4 md:mt-6">
            <div className="flex items-center justify-center gap-2 text-2xl text-white">{winner} won !</div>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-opacity-50 text-white font-bold rounded"
              onClick={resetBoard}>
              Play Again
            </button>
          </div>
        )}
        {isDraw && (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-medium text-white">Draw!</h3>
            <button
              className="mt-5 px-4 py-2 bg-gray-700 hover:bg-opacity-50 text-white font-bold rounded"
              onClick={resetBoard}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTac3;
const winningPositions = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];
