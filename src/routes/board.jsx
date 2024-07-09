import { useEffect, useState } from "react";
import {
  useNavigate,
  Outlet,
  useParams,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";

// database/storage functions
import {
  addTask,
  getBoard,
  getBoard2,
  getCardById,
  getColumnDataById,
  saveBoard,
  useBoard,
} from "./../boards";

// components
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "../components/Card";
import { AddCard } from "../components/AddCard";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";

// handle formdata submit when task is added
export async function action({ request, params }) {
  const formData = await request.formData();
  const newTask = Object.fromEntries(formData);

  await addTask(params.boardId, newTask.columnName, newTask);
  window.location.reload();
  return null;
}

// load board through URL navigation board id
export async function loader({ params }) {
  const board = await getBoard(params.boardId);
  console.log("board in loader is", board);
  return { board };
}

export const Board = () => {
  const { id } = useParams();
  const {
    status: statusPost,
    error: errorPost,
    data: board2,
  } = useQuery({
    queryKey: ["board", parseInt(id)],
    queryFn: () => getBoard2(id),
  });

  console.log("Status:", statusPost);
  console.log("Error:", errorPost);
  console.log("Board data:", board2);

  const { toggleModal } = useOutletContext();
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  // const [activeBoard, setActiveBoard] = useState(board);

  // load board data whenever different URL is opened
  const fetchBoardData = async () => {
    const newBoard = await getBoard(params.boardId);
    setActiveBoard(newBoard);
  };

  // useEffect(() => {
  //   if(board) {
  //     const fetchColumns = async () => {
  //       const columnPromises = Object.keys(board.columnIds).map((columnId) => ()
  //     }
  //   }
  // })

  useEffect(() => {
    saveBoard(params.boardId, activeBoard);
  }, [activeBoard]);

  const handleCardClick = (task) => {
    toggleModal();
    navigate(`cards/${task.title}`);
  };

  function completedTasks(tasks) {
    return tasks.filter((task) => task.isCompleted === true).length;
  }

  const colors = ["bg-list0", "bg-list1", "bg-list2", "bg-list3", "bg-list4"];

  const onDragEnd = (result) => {
    const { source, destination } = result;

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
          {Object.keys(activeBoard.lists).map((key, index) => {
            const column = getColumnDataById(key);
            console.log("key of column is", key);

            return (
              <div key={column.listName} className="">
                <div className="flex flex-row items-center gap-2">
                  <div
                    className={`${
                      colors[index % colors.length]
                    } w-4 h-4 rounded-full`}
                  ></div>
                  <span className="text-gray text-xs uppercase tracking-widest">
                    {column.name}
                  </span>
                </div>

                <Droppable droppableId={column.name} type="group">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {console.log("hey, column.tasks is", column)}
                      {Object.keys(column.tasks).map((key, index) => {
                        const task = getCardById(key);
                        return (
                          <Draggable
                            draggableId={task.title}
                            key={task.title}
                            index={taskIndex}
                          >
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <Card
                                  task={task}
                                  completedTasks={completedTasks}
                                  onClick={() => handleCardClick(task)}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      <AddCard
                        columnName={column.name}
                        fetchBoard={fetchBoardData}
                      />
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
