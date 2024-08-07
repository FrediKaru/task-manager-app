import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//Import Routes
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import {
  Board,
  loader as boardLoader,
  action as boardAction,
} from "./routes/board";
import {
  EditTask,
  loader as editLoader,
  action as editAction,
} from "./routes/edit";

//Errors
import ErrorPage from "./routes/error-page.jsx";
import BoardErrorPage from "./routes/board-error.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: rootAction,
    children: [
      {
        path: "boards/:boardId",
        element: <Board />,
        action: boardAction,
        loader: boardLoader,
        errorElement: <BoardErrorPage />,
        children: [
          {
            path: "cards/:taskTitle",
            element: <EditTask />,
            loader: editLoader,
            action: editAction,
          },
        ],
      },
    ],
  },
]);
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
