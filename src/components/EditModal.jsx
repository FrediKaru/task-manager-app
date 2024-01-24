import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskByName, saveTask } from "./../boards";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-900 dark:text-white";

export const EditModal = () => {
  const [oldTask, setOldTask] = useState("");
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  const { taskTitle } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await getTaskByName(taskTitle);
        setFormData(task);
        setOldTask(task);
      } catch (error) {
        console.log("Error finding your item:", error);
      }
    };
    fetchData();
  }, []);

  function handleSave() {
    saveTask(oldTask, formData);
    navigate(-1);
  }

  // useEffect(() => {
  //   console.log("formData is", JSON.stringify(formData));
  // }, [formData]);

  return (
    <div className="  text-white p-4 w-full flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">{formData.title}</h2>
        <button className="text-gray opacity-50" onClick={() => navigate(-1)}>
          X
        </button>
      </div>

      <div className="flex flex-col inp-group">
        <label for="first_name" className={labelClass}>
          Title
        </label>
        <input
          type="text"
          id="title"
          className={inputClass}
          placeholder="e.g Take coffee break"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        ></input>
      </div>
      <div className="flex flex-col inp-group">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          type="text"
          id="description"
          className={`${inputClass} h-36`}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          defaultValue={formData.description}
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        />
      </div>
      <div className="flex flex-col inp-group">
        <label htmlFor="subtasks" className={labelClass}>
          Subtasks
        </label>
        <input
          type="text"
          id="subtasks"
          placeholder="e.g Make coffee"
          className={inputClass}
        />
        <ul>
          {formData.subtasks &&
            formData.subtasks.map((subtask) => (
              <li key={subtask.title}>
                <p>{subtask.title}</p>
              </li>
            ))}
        </ul>
      </div>
      <button
        type="button"
        className="text-purple bg-white w-full hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
      >
        + Add New Subtask
      </button>
      <div className="flex flex-col inp-group">
        <label htmlFor="subtasks" className={labelClass}>
          Status
        </label>
        <select
          value={formData.status}
          className={`${inputClass}`}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Doing">Done</option>
        </select>
      </div>
      <button
        type="button"
        onClick={handleSave}
        className="text-white bg-purple w-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save
      </button>
    </div>
  );
};
