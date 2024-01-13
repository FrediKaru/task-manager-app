import React, { useEffect, useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState("ss");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("./src/api/data.json");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fething tasks", error);
      }
    };
    fetchTasks();
  }, []);

  return { tasks };
};
