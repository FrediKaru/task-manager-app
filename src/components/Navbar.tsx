import React from "react";

export const Navbar = ({ boardName, setModal }) => {
  return (
    <div className=" bg-secondary text-white py-4 flex flex-row justify-between  items-center">
      <h2 className="text-xl font-bold dark:text-white">{boardName}</h2>
      <button className="bg-purple rounded-full px-5 py-3" onClick={setModal}>
        + Add new Task
      </button>
    </div>
  );
};
