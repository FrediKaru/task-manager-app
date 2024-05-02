import { Outlet, useLoaderData, redirect } from "react-router-dom";

import { getBoards, addBoard } from "../boards";

// Components
import { Navbar } from "../components/Navbar";
import { Logo } from "../components/Logo";
import BoardList from "../components/BoardList";

export async function loader() {
  const boards = await getBoards();
  return { boards };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const newForm = Object.fromEntries(formData);
  const id = await Math.random();
  console.log("new id", id);
  await addBoard(newForm.name, id);
  return redirect(`/boards/${id}`);
}

function Root() {
  const { boards } = useLoaderData();

  return (
    <>
      <div className="flex flex-col h-screen w-full main">
        <div className="flex flex-row">
          <div className="logo bg-secondary col-span-1 row-span-1 flex items-center">
            <Logo />
          </div>
          <div className="navbar bg-secondary flex flex-grow  px-4">
            <Navbar />
          </div>
        </div>
        <div className="flex flex-row bg-secondary w-full grow">
          <div id="sidebar" className="hidden lg:block">
            <BoardList boards={boards} />
          </div>
          <div className="content bg-primary p-4  ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
