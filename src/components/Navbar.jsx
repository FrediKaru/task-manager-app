import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoard, saveBoardName } from "../boards";
import DropdownButton from "./Dropdown";

export const Navbar = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleEditing() {
    setIsEditing(!isEditing);
  }

  async function handleSave() {
    console.log("save happened");
    await saveBoardName(boardId, title);
    window.location.reload();
    handleEditing();
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
    <div className="flex grow  bg-secondary text-white py-4   items-center justify-between">
      {isEditing ? (
        <input
          value={title}
          className="text-xl font-bold dark:text-white bg-secondary"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
        ></input>
      ) : (
        <div>
          <h2
            className="text-xl font-bold dark:text-white  hidden lg:block mr-auto"
            onClick={handleEditing}
          >
            {title}
          </h2>
          <div className="text-md flex">
            <div className="flex lg:hidden font-medium dark:text-white">
              <h2>Boards</h2>
            </div>
            <DropdownButton
              options={["one", "three"]}
              title={title}
              onClick={console.log("bang")}
            />
          </div>
        </div>
      )}
      <div className="bg-purple rounded-full text-sm w-10 h-10 flex items-center justify-center">
        <span>FK</span>
      </div>
    </div>
  );
};
