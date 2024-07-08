import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import AddBoard from "./AddBoard";
import { getBoard } from "../boards";

export default function BoardList({ boards }) {
  const [boardDetails, setBoardDetails] = useState({});

  useEffect(() => {
    const fetchBoardDetails = async () => {
      const details = {};
      for (const key of Object.keys(boards)) {
        details[key] = await getBoard(key);
      }
      setBoardDetails(details);
    };
    fetchBoardDetails();
  }, [boards]);

  console.log("boards are", boards);
  return (
    <nav className="mt-10 text-purple">
      <h1 className="text-white text-md font-medium">Boards</h1>
      <ul>
        {Object.entries(boardDetails).map(([key, board]) => (
          <li key={key}>
            <NavLink
              to={`/boards/${key}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <h2>{board.boardName}</h2>
            </NavLink>
          </li>
        ))}
        {/* {boards.map((board) => (
          <li key={board.id}>
            <NavLink
              to={`/boards/${board.id}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <h2>{board.name}</h2>
            </NavLink>
          </li>
        ))} */}
        <li>
          <AddBoard />
        </li>
      </ul>
    </nav>
  );
}
