import React, { useEffect, useState, useRef } from "react";

export function AddCard() {
  const [userClicked, setUserClicked] = useState(false);
  const inputRef = useRef(null);

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
    <div>
      {userClicked ? (
        <div
          className="bg-secondary rounded-lg my-2 px-3 py-5 cursor-pointer"
          ref={inputRef}
        >
          <input
            ref={inputRef}
            placeholder="Enter title here..."
            className="bg-secondary"
          ></input>
          <br></br>
          <button>Add a card</button>
        </div>
      ) : (
        <div className="  rounded-lg my-2 px-3 py-5 cursor-pointer">
          <button className="text-gray" onClick={handleUserClick}>
            + Add a card
          </button>
        </div>
      )}
    </div>
  );
}
