import React, { useEffect, useState } from "react";

type Subtask = {
  title: string;
  isCompleted: boolean;
};

type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

type Column = {
  name: string;
  tasks: Task[];
};

type Board = {
  name: string;
  isActive: boolean;
  columns: Column[];
};

export const useTasks = () => {
  const [boardsData, setBoardsData] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = "src/api/data.json";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const userData = await response.json();
        console.log(userData);

        setBoardsData(userData.boards);
        setCurrentBoard(userData.boards[0]);
        console.log("here");
        console.log(currentBoard);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  return {
    boardsData,
    currentBoard,
    setCurrentBoard,
  };
};
