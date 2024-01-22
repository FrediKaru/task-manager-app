import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTasks } from "../hooks/useTasks";

export const Board = () => {
  const { boardsData, currentBoard } = useTasks();
  console.log(currentBoard)

  function completedTasks(tasks) {
    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    return completedTasks.length;
  }

  return (
    <div>
      <h3>This is board comp</h3>
      <DragDropContext
        onDragEnd={() => {
          console.log("dragndrop happened");
        }}
      >
        <div className="grid grid-cols-3 gap-5 text-white ">
          {currentBoard.columns.map((column) => (
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
                    {column.tasks.map((task, index: number) => (
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
                            <div className=" bg-secondary rounded-lg my-2 px-3 py-5 cursor-pointer">
                              <h4>{task.title}</h4>
                              <p className="text-gray">
                                {completedTasks(task.subtasks)} of{" "}
                                {task.subtasks.length} substacks
                              </p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
