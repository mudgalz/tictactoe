import React, { useEffect, useState } from "react";
import { Oicon, Xicon } from "./icons";
const Player = {
  X: <Xicon />,
  O: <Oicon />,
};

const Game = () => {
  const [board, setBoard] = useState(Array(81).fill(null));
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
    const winningPositions = getWinningPositions();

    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c, d, e] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e]) {
        setWinner(board[a]);
        setWinningCells([a, b, c, d, e]);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setIsDraw(true);
    }
  };

  const getWinningPositions = () => {
    const winningPositions = [];

    // Rows
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col <= 4; col++) {
        winningPositions.push([row * 9 + col, row * 9 + col + 1, row * 9 + col + 2, row * 9 + col + 3, row * 9 + col + 4]);
      }
    }

    // Columns
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row <= 4; row++) {
        winningPositions.push([row * 9 + col, (row + 1) * 9 + col, (row + 2) * 9 + col, (row + 3) * 9 + col, (row + 4) * 9 + col]);
      }
    }

    // Diagonals (top-left to bottom-right)
    for (let row = 0; row <= 4; row++) {
      for (let col = 0; col <= 4; col++) {
        winningPositions.push([row * 9 + col, (row + 1) * 9 + col + 1, (row + 2) * 9 + col + 2, (row + 3) * 9 + col + 3, (row + 4) * 9 + col + 4]);
      }
    }

    // Diagonals (top-right to bottom-left)
    for (let row = 0; row <= 4; row++) {
      for (let col = 4; col < 9; col++) {
        winningPositions.push([row * 9 + col, (row + 1) * 9 + col - 1, (row + 2) * 9 + col - 2, (row + 3) * 9 + col - 3, (row + 4) * 9 + col - 4]);
      }
    }

    return winningPositions;
  };

  const resetBoard = () => {
    setBoard(Array(81).fill(null));
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
        className={`flex p-1 md:p-2 active:scale-95 duration-150 justify-center sm:h-16 items-center h-10 md:h-[4.2rem] md:w-[4.2rem] border md:border border-gray-400 md:rounded cursor-pointer ${index < 9 ? "border-t" : "border-t-0"} ${index % 9 == 0 ? "border-l" : "border-l-0"} font-bold ${isWinningCell ? "text-green-400 bg-green-950/30 md:border-green-600" : "text-blue-200"}`}
        onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  return (
    <div className="text-white flex justify-center items-center mt-32 sm:mt-20 md:mt-8">
      <div className="w-[44rem]">
        <button
          onClick={() => resetBoard()}
          className={`h-12 ${winner && "bg-red-600"} absolute left-1/2 -translate-x-1/2 md:left-16 lg:left-40 md:top-1/2 bottom-16 py-2 px-10 shadow shadow-gray-800 rounded bg-gray-700 text-white hover:opacity-80`}>
          Reset
        </button> 
        <div className="grid grid-cols-9 md:gap-2">{board.map((_, index) => renderCell(index))}</div>
      </div>
    </div>
  );
};

export default Game;
