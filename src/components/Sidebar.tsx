import React from "react";

import boardIcon from "../assets/icon-board.svg";

function BoardListItem({ board, selectedBoard, selectBoard }) {
  return (
    <div className="">
      <div
        onClick={() => selectBoard(board.name)}
        className={
          board.name === selectedBoard.name
            ? "text-white bg-purple pl-3 py-2 flex rounded-r-full"
            : "text-gra pl-3 py-2 flex"
        }
      >
        <img src={boardIcon} alt="Board Icon" />
        <p className="ml-1">{board.name}</p>
      </div>
    </div>
  );
}

export const Sidebar = ({ data, selectBoard, selectedBoard }) => {
  return (
    <div className=" text-gray">
      <p>ALL BOARDS ({data.boards.length})</p>
      {data.boards.map((board) => (
        <BoardListItem
          key={board.name}
          board={board}
          selectedBoard={selectedBoard}
          selectBoard={selectBoard}
        />
      ))}
      <a href="#" className="text-purple">
        <img src={boardIcon} style={{ fill: "#FFFFFF" }} alt="Board Icon" /> +
        Create new board
      </a>
    </div>
  );
};
