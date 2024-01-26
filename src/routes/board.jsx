import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { addTask, getBoard } from "./../boards";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLoaderData, Form } from "react-router-dom";
import { Card } from "../components/Card";
import { AddCard } from "../components/AddCard";

export async function action({ request, params }) {
  const formData = await request.formData();
  const newTask = Object.fromEntries(formData);
  // console.log("formData name is:", newTask.title);
  // console.log("formData column is:", newTask.columnName);
  // console.log("action triggered in board");
  await addTask(params.boardId, newTask.columnName, newTask);
  return null;
}

export async function loader({ params }) {
  const board = await getBoard(params.boardId);
  return { board };
}

export const Board = () => {
  const navigate = useNavigate();
  const { board } = useLoaderData();

  // const [userInput, setUserInput] = useState("");
  // const [userClicked, setUserClicked] = useState(false);
  // const inputRef = useRef(null);

  const handleCardClick = (task) => {
    navigate(`/board/${board.id}/cards/${task.title}`);
    ///boards/${board.id}/cards/${task.title}
  };

  function completedTasks(tasks) {
    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    return completedTasks.length;
  }

  return (
    <div>
      <DragDropContext onDragEnd={() => {}}>
        <div className="grid grid-cols-3 gap-5 text-white ">
          {board.columns.map((column) => (
            <div key={column.name}>
              <div className="flex items-center gap-2">
                <div className={`bg-todo w-4 h-4 rounded-full`}></div>
                <span className="text-gray text-xs uppercase tracking-widest">
                  {column.name} ({column.tasks.length})
                </span>
              </div>

              <Droppable droppableId={column.name} type="group">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {column.tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.title}
                        key={task.title}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <NavLink
                              to={`/boards/${board.id}/cards/${task.title}`}
                            >
                              <Card
                                task={task}
                                completedTasks={completedTasks}
                                onClick={handleCardClick}
                              />
                            </NavLink>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>

              <AddCard
                columnName={column.name}
                // refreshPage={refreshPage}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
      {/* <Routes>
        <Route path="boards/:boardsId/cards/:cardId" element={<EditModal />} />
      </Routes> */}
    </div>
  );
};
