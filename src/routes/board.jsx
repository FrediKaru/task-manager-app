import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useNavigate,
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";

// database/storage functions
import { addTask, getBoard, saveBoard } from "./../boards";

// components
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "../components/Card";
import { AddCard } from "../components/AddCard";

// handle formdata submit when task is added
export async function action({ request, params }) {
  const formData = await request.formData();
  const newTask = Object.fromEntries(formData);

  await addTask(params.boardId, newTask.columnName, newTask);

  // Use history.push() to navigate to a different route after adding the task
  redirect("/boards/1");

  return null;
}
// load board through url navigation board id
export async function loader({ params }) {
  const board = await getBoard(params.boardId);
  return { board };
}

export const Board = () => {
  const { toggleModal } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();
  const { board } = useLoaderData();
  const [activeBoard, setActiveBoard] = useState(board);

  // load board data whenever different URL is opened
  const fetchBoardData = async () => {
    const newBoard = await getBoard(params.boardId);
    setActiveBoard(newBoard);
  };
  useEffect(() => {
    fetchBoardData();
  }, [params.boardId]);

  useEffect(() => {
    saveBoard(activeBoard);
  }, [activeBoard]);

  const handleCardClick = (task) => {
    toggleModal();
    navigate(`cards/${task.title}`);
  };

  function completedTasks(tasks) {
    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    return completedTasks.length;
  }
  const colors = ["bg-list0", "bg-list1", "bg-list2", "bg-list3", "bg-list4"];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // create shallow copy of the board
    let updatedBoard = { ...activeBoard };

    // get source column index from droppableId (column name)
    const sourceColumnIndex = updatedBoard.columns.findIndex(
      (column) => column.name === source.droppableId
    );
    // get destination column index from droppableId (column name)
    const destinationColumnIndex = updatedBoard.columns.findIndex(
      (column) => column.name === destination.droppableId
    );
    // remove dragged item from the source column and save it
    const [movedItem] = updatedBoard.columns[sourceColumnIndex].tasks.splice(
      source.index,
      1
    );
    // add saved item to the destination column
    updatedBoard.columns[destinationColumnIndex].tasks.splice(
      destination.index,
      0,
      movedItem
    );

    setActiveBoard(updatedBoard);
  };
  return (
    <div className="flex h-full">
      <div className="modal">
        <Outlet />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex horizontal-scroll-wrapper">
          {activeBoard.columns.map((column, index) => (
            <div key={column.name} className="">
              <div className="flex flex-row items-center gap-2 ">
                <div
                  className={`${
                    colors[index % colors.length]
                  } w-4 h-4 rounded-full`}
                ></div>
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
                            {/* <NavLink
                              to={`/boards/${board.id}/cards/${task.title}`}
                            > */}
                            <Card
                              task={task}
                              completedTasks={completedTasks}
                              onClick={() => handleCardClick(task)}
                            />
                            {/* </NavLink> */}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <AddCard
                      columnName={column.name}
                      fetchBoard={fetchBoardData}
                    />
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
