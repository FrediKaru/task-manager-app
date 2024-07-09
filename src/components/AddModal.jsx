import React, { useState } from "react";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-900 dark:text-white";

// type Subtask = { title: string; isCompleted: boolean };

// type FormData = {
//   title: string;
//   description?: string;
//   status: string;
//   subtasks?: Subtask[];
// };

export const AddModal = ({ exitModal, columns, addTask }) => {
  const [formData, setFormData] =
    useState <
    FormData >
    {
      title: "",
      status: "",
    };

  return (
    <div className="  text-white p-4 w-full flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Add New Task</h2>
        <button className="text-gray opacity-50" onClick={exitModal}>
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
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          className={`${inputClass}`}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          {columns.map((column) => (
            <option value={column.name}>{column.name}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onSubmit={() => addTask(formData)}
        className="text-white bg-purple w-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Task
      </button>
    </div>
  );
};
