import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoard } from "../boards";

export const Navbar = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleEditing() {
    setIsEditing(!isEditing);
  }

  function handleSave() {
    console.log("save happened");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const board = await getBoard(boardId);
        setTitle(board.name);
      } catch (error) {
        console.log("Error finding your item:", error);
      }
    };
    fetchData();
  }, [boardId]);

  // useEffect(() => {
  //   console.log(title);
  // }, [title]);

  return (
    <div className=" bg-secondary text-white py-4 flex flex-row justify-between  items-center">
      {isEditing ? (
        <input
          value={title}
          className="text-xl font-bold dark:text-white bg-secondary"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
        ></input>
      ) : (
        <h2
          className="text-xl font-bold dark:text-white"
          onClick={handleEditing}
        >
          {title}
        </h2>
      )}

      <button className="bg-purple rounded-full px-5 py-3">
        + Add new Task
      </button>
    </div>
  );
};
