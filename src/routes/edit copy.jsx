import React, { useState } from "react";
import { useNavigate, useLoaderData, Form, redirect } from "react-router-dom";
import { getTaskByName, updateTask } from "./../boards";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-900 dark:text-white";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateTask(params.taskTitle, updates);
  return redirect(`/boards/${params.boardId}`);
}

export async function loader({ params }) {
  const task = await getTaskByName(params.taskTitle);
  return { task };
}

const FormField = ({ name, type, element = "input" }) => {
  
  const Element = element
  return (
    <Element type={type} id={name} name={name} className={inputClass}></Element>
  );
};
const InputGroup = ({ children }) => {
  return <div className="flex flex-col inp-group">{children}</div>;
};

export const EditTask = () => {
  const { task } = useLoaderData();
  const [title, setTitle] = useState(task.title);
  const navigate = useNavigate();

  return (
    <Form method="post" id="task-form">
      <div className="  text-white p-4 w-full flex flex-col gap-5">
        <div className="flex justify-between">
          <button className="text-gray opacity-50">X</button>
        </div>
        <InputGroup>
          <FormField name={"adress"}></FormField>
          <h1 className="text-2xl font-bold mb-7">{title}</h1>
          <label for="first_name" className={labelClass}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={inputClass}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g Take coffee break"
            defaultValue={task.title}
            required
          ></input>
        </InputGroup>
        <InputGroup>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            className={`${inputClass} h-36`}
            defaultValue={task.description}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </InputGroup>
        <button
          type="button"
          className="text-white bg-purple w-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-white text-purple w-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </Form>
  );
};
