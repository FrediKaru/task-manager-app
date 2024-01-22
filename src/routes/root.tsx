import { useState } from "react";
import { Outlet } from "react-router";

// Components
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { Content } from "../components/Board";
import { Logo } from "../components/Logo";

import { useTasks } from "../hooks/useTasks";

function Root() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen">
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 opacity-50 bg-secondary"></div>
            <div className="absolute bg-primary p-4 rounded-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/3">
              {/* <AddModal
              // exitModal={setModal}
              // addTask={addTask}
              // columns={selectedBoard.columns}
              /> */}
            </div>
          </div>
        )}
        <div className="flex flex-row">
          <div className="logo bg-secondary col-span-1 row-span-1 flex items-center">
            <Logo />
          </div>
          <div className="navbar bg-secondary flex-grow">
            <div className="mx-4">
              <Navbar />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-grow bg-secondary">
          <div className="sidebar">
            <div className="mt-10">
              <Sidebar />
            </div>
          </div>
          <div className="content bg-primary flex-grow">
            <div className="mx-4 mt-10">
              {/* <Content /> */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
