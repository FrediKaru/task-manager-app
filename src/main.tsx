import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";

import { Board, loader as boardLoader } from "./routes/board";
import "./index.css";
import ErrorPage from "./routes/error-page.js";
import BoardErrorPage from "./routes/board-error.js";
import { EditModal } from "./components/EditModal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "boards/:boardId",
        element: <Board />,
        loader: boardLoader,
        errorElement: <BoardErrorPage />,
      },
      { path: "boards/:boardId/cards/:cardId", element: <EditModal /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
