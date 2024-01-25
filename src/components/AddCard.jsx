import React, { useEffect, useState, useRef } from "react";

import { addTask } from "../boards";

export function AddCard({ boardId, columnName }) {
  const [userInput, setUserInput] = useState("");
  const [userClicked, setUserClicked] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setUserClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  function handleUserClick() {
    setUserClicked(!userClicked);
  }
  async function handleSave() {
    await addTask(boardId, columnName, userInput);
    await setUserInput("");
  }

  return (
    <div>
      {userClicked ? (
        <div
          className="bg-secondary rounded-lg my-2 px-3 py-5 cursor-pointer"
          ref={inputRef}
        >
          <textarea
            ref={inputRef}
            style={{ resize: "none" }}
            placeholder="Enter title here..."
            className="bg-secondary w-full"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <br></br>
          <button
            className="bg-purple rounded-full px-5 py-1 text-sm mt-4"
            onClick={handleSave}
          >
            Add a card
          </button>
        </div>
      ) : (
        <div className="  rounded-lg my-2 px-3 py-1 cursor-pointer">
          <button className="text-gray" onClick={handleUserClick}>
            + Add a card
          </button>
        </div>
      )}
    </div>
  );
}
