import React from "react";

import { NavLink } from "react-router-dom";

import AddBoard from "./AddBoard";

export default function BoardList({ boards }) {
  return (
    <nav className="mt-10 text-purple">
      <h1 className="text-white text-md font-medium">Boards</h1>
      <ul>
        {boards &&
          boards.map((board) => (
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
          ))}
        <li>
          <AddBoard />
        </li>
      </ul>
    </nav>
  );
}
