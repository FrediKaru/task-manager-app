import "./App.css";
import { useState } from "react";

// Components
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import { Logo } from "./components/Logo";
import { AddModal } from "./components/AddModal";

// Fetch data
import data from "./data.json";

function App() {
  const [allBoards, setAllBoards] = useState(data);
  const [selectedBoard, setSelectedBoard] = useState(allBoards.boards[0]);
  const [modalOpen, setModalOpen] = useState(true);

  function selectBoard(boardName) {
    setSelectedBoard(data.boards.find((board) => board.name === boardName));
  }

  function addTask(task) {
    const columnIndex = selectedBoard.columns.findIndex(
      (column) => column.name === task.status
    );

    if (columnIndex !== -1) {
      const updatedBoard = { ...selectedBoard };

      const updatedColumn = { ...updatedBoards.columns[columnIndex] };
      //////!!!!!!!!!!!!
      updatedColumn.push(task);
      updatedBoards.columns[columnIndex] = updatedColumn;

      setAllBoards(updatedBoards);

      console.log("Task added to column");
    } else {
      console.log("Column with status cc not found.");
    }
  }

  function setModal() {
    setModalOpen(!modalOpen);
  }
  return (
    <>
      <div className="flex flex-col h-screen">
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 opacity-50 bg-secondary"></div>
            <div className="absolute bg-primary p-4 rounded-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/3">
              <AddModal
                exitModal={setModal}
                addTask={addTask}
                columns={selectedBoard.columns}
              />
            </div>
          </div>
        )}
        <div className="flex flex-row">
          <div className="logo bg-secondary col-span-1 row-span-1 flex items-center">
            <Logo />
          </div>
          <div className="navbar bg-secondary flex-grow">
            <div className="mx-4">
              <Navbar boardName={selectedBoard.name} setModal={setModal} />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-grow bg-secondary">
          <div className="sidebar">
            <div className="mt-10">
              <Sidebar
                data={data}
                selectBoard={selectBoard}
                selectedBoard={selectedBoard}
              />
            </div>
          </div>
          <div className="content bg-primary flex-grow">
            <div className="mx-4 mt-10">
              <Content data={data} selectedBoard={selectedBoard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
