import React from "react";

import boardIcon from "../assets/icon-board.svg";
import { useTasks } from "../hooks/useTasks";

function BoardListItem({ board, currentBoard }) {
  return (
    <div
      className=""
      className={
        board.name === currentBoard
          ? "text-white bg-purple pl-3 py-2 flex rounded-r-full"
          : "text-gray pl-3 py-2 flex"
      }
    >
      <div onClick={() => console.log("yes")}>
        <img src={boardIcon} alt="Board Icon" />
        <p className="ml-1">{board.name}</p>
      </div>
    </div>
  );
}

export const Sidebar = () => {
  const { boardsData, currentBoard, setCurrentBoard } = useTasks();
  // console.log("here");
  // console.log(boardsData);

  return (
    <div className=" text-gray">
      <p>ALL BOARDS {boardsData.length}</p>
      {boardsData.map((board) => (
        <BoardListItem
          key={board.name}
          board={board}
          currentBoard={currentBoard}
        />
      ))}
      <a href="#" className="text-purple">
        <img src={boardIcon} style={{ fill: "#FFFFFF" }} alt="Board Icon" /> +
        Create new board
      </a>
    </div>
  );
};
