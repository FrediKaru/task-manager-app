import React, { useEffect, useState, useRef } from "react";

import { Form, useParams } from "react-router-dom";

export function AddCard({ columnName }) {
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

  return (
    <Form method="post" id="add-task" onSubmit={handleUserClick}>
      {userClicked ? (
        <div
          className="bg-secondary rounded-lg my-2 px-3 py-5 cursor-pointer"
          ref={inputRef}
        >
          <textarea
            ref={inputRef}
            name="title"
            style={{ resize: "none" }}
            placeholder="Enter title here..."
            className="bg-secondary w-full"
          ></textarea>
          <input type="hidden" name="columnName" defaultValue={columnName} />
          <br></br>
          <button
            button="submit"
            className="bg-purple rounded-full px-5 py-1 text-sm mt-4"
            // onClick={handleSave}
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
    </Form>
  );
}
