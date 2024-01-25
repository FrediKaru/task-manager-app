import { Outlet, useLoaderData, NavLink, Form } from "react-router-dom";

import { getBoards } from "../boards";

// Components
import { Navbar } from "../components/Navbar";
import { Logo } from "../components/Logo";

export async function loader() {
  const boards = await getBoards();
  return { boards };
}

function Root() {
  const { boards } = useLoaderData();
  console.log(boards);

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
                      to={`boards/${board.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      <h2>{board.name}</h2>
                    </NavLink>
                  </li>
                ))}
                <li>
                  <Form method="post">
                    <button type="submit" className="text-gray">
                      Add new +
                    </button>
                  </Form>
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
