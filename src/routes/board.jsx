import React, { useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { getBoard } from "./../boards";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLoaderData } from "react-router-dom";
import { Card } from "../components/Card";
import { AddCard } from "../components/AddCard";

export async function loader({ params }) {
  const board = await getBoard(params.boardId);
  return { board };
}

export const Board = () => {
  const navigate = useNavigate();
  const { board } = useLoaderData();

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
      <DragDropContext
        onDragEnd={() => {
          console.log("dragndrop happened");
        }}
      >
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
                            <Link to={`boards/${board.id}/cards/${task.title}`}>
                              <Card
                                task={task}
                                completedTasks={completedTasks}
                                onClick={handleCardClick}
                              />
                            </Link>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
              <AddCard />
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
