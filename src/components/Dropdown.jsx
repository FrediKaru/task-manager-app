import React, { useEffect, useState } from "react";
import { getBoards } from "../boards";
import { NavLink, redirect } from "react-router-dom";

const Dropdown = ({ options, onSelect }) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-secondary rounded-md shadow-md">
      {options.map((option) => (
        <NavLink
          onClick={onSelect}
          key={option.id}
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          to={`/boards/${option.id}`}
        >
          {option.name}
        </NavLink>
      ))}
    </div>
  );
};

const DropdownButton = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [boards, setBoards] = useState();

  useEffect(() => {
    async function fetchBoards() {
      const boardsData = await getBoards();
      setBoards(boardsData);
    }
    fetchBoards();
  }, []);

  const handleTitleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // Handle option selection
    console.log("Selected option:", option);
    setIsOpen(false);
    redirect(`/boards/${option.id}`);
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center lg:hidden text-md font-medium dark:text-white "
        onClick={handleTitleClick}
      >
        <span className="mx-2">&gt;</span>
        <h2 className="underline">{title}</h2>
      </div>
      {isOpen && <Dropdown options={boards} onSelect={handleOptionClick} />}
    </div>
  );
};

export default DropdownButton;
