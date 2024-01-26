import {
  Outlet,
  useLoaderData,
  NavLink,
  Form,
  redirect,
} from "react-router-dom";

import { getBoards, addBoard } from "../boards";

// Components
import { Navbar } from "../components/Navbar";
import { Logo } from "../components/Logo";
import { useEffect, useState } from "react";

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
  const [boardInputVisible, setBoardInputVisible] = useState(false);
  const { boards } = useLoaderData();
  console.log(boards);

  function handleBoardInput() {
    setBoardInputVisible(!boardInputVisible);
  }

  return (
    <>
      <div className="flex flex-col h-screen">
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
          <div id="sidebar">
            <nav className="mt-10 text-purple">
              <h1 className="text-white text-md font-medium">Boards</h1>
              <ul>
                {boards.map((board) => (
                  <li key={board.id}>
                    <NavLink
                      to={`/boards/${board.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      <h2>{board.name}</h2>
                    </NavLink>
                  </li>
                ))}
                <li>
                  {boardInputVisible ? (
                    <Form method="post" onSubmit={handleBoardInput}>
                      <input name="name"></input>
                      <button
                        type="submit"
                        className="bg-purple rounded-full px-5 py-1 text-sm mt-4 text-white"
                      >
                        Add board
                      </button>
                    </Form>
                  ) : (
                    <button
                      type="button"
                      className="text-gray"
                      onClick={handleBoardInput}
                    >
                      Add new +
                    </button>
                  )}
                </li>
              </ul>
            </nav>
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
