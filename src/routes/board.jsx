import React from "react";
import { getBoard } from "./../boards";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useTasks } from "../hooks/useTasks";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const board = await getBoard(params.boardId);
  return { board };
}

export const Board = () => {
  const { board } = useLoaderData();
  console.log(board);

  // function completedTasks(tasks) {
  //   const completedTasks = tasks.filter((task) => task.isCompleted === true);
  //   return completedTasks.length;
  // }

  return (
    <div>
      <h3>ss</h3>
    </div>
  );
};
