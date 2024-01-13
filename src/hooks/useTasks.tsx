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
  const [tasks, setTasks] = useState<Board[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = "./src/api/data.json";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasksData: Board[] = await response.json();

        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  return { tasks };
};
