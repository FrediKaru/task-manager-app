import React from "react";

export function Card({ task, onClick, completedTasks }) {
  return (
    <div
      className=" bg-secondary rounded-lg my-2 px-3 py-5 cursor-pointer text-white"
      onClick={onClick}
    >
      <h4>{task.title}</h4>
      <p className="text-gray">
        {completedTasks(task.subtasks)} of {task.subtasks.length} substacks
      </p>
    </div>
  );
}
