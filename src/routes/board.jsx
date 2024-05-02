import { useEffect, useState } from "react";
import {
  useNavigate,
  Outlet,
  useParams,
  useLoaderData,
} from "react-router-dom";

// database/storage functions
import { addTask, getBoard, saveBoard } from "./../boards";

// components
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "../components/Card";
import { AddCard } from "../components/AddCard";

export async function action({ request, params }) {
  const formData = await request.formData();
  const newTask = Object.fromEntries(formData);

  await addTask(params.boardId, newTask.columnName, newTask);
  return null;
}

export async function loader({ params }) {
  const board = await getBoard(params.boardId);
  return { board };
}

export const Board = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { board } = useLoaderData();
  const [activeBoard, setActiveBoard] = useState(board);

  // load board data whenever different URL is opened
  useEffect(() => {
    const fetchBoardData = async () => {
      const newBoard = await getBoard(params.boardId);
      setActiveBoard(newBoard);
    };
    fetchBoardData();
  }, [params.boardId]);

  useEffect(() => {
    saveBoard(activeBoard);
  }, [activeBoard]);

  const handleCardClick = (task) => {
    navigate(`cards/${task.title}`);
    ///boards/${board.id}/cards/${task.title}
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
    <div>
      {/* <div className="overlay"></div> */}
      <div className="modal bg-secondary">
        <Outlet />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="horizontal-scroll-wrapper max-w-sm">
          {activeBoard.columns.map((column, index) => (
            <div key={column.name}>
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
                  </div>
                )}
              </Droppable>

              <AddCard
                columnName={column.name}
                // refreshPage={refreshPage}
              />
            </div>
          ))}
          <h2>Add new Column</h2>
        </div>
      </DragDropContext>
      {/* <Routes>
        <Route path="boards/:boardsId/cards/:cardId" element={<EditModal />} />
      </Routes> */}
    </div>
  );
};
