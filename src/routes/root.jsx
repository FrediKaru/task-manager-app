import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getBoards, addBoard } from "../boards";

// Components
import { Navbar } from "../components/Navbar";
import { Logo } from "../components/Logo";
import BoardList from "../components/BoardList";
import { useEffect, useState } from "react";

export async function loader() {
  try {
    const boards = await getBoards();
    console.log("API Response:", boards); // Log API response
    return { boards };
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error; // Propagate the error if needed
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const newForm = Object.fromEntries(formData);
  const id = await Math.random();
  console.log("new id", id);
  await addBoard(newForm.name, id);
  return redirect(`/boards/${id}`);
  // return null;
}

function Root() {
  const { boards } = useLoaderData();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // prevent the page to load outside of page route
  useEffect(() => {
    if (location.pathname !== "/boards") {
      navigate("/boards/1");
    }
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={`main flex flex-col h-screen w-full`}>
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
            <Outlet context={{ toggleModal }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
