import React from "react";
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

const FormInput = ({
  name,
  type = "text",
  element = "input",
  placeholder = "",
  defaultValue = "",
  addClasses,
}) => {
  const Element = element;
  return (
    <>
      <label className={labelClass} htmlFor={name}>
        {name.charAt(0).toUpperCase()}
        {name.slice(1)}
      </label>
      <Element
        type={type}
        id={name}
        name={name}
        className={`${inputClass} ${addClasses || ""}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></Element>
    </>
  );
};

const InputGroup = ({ children }) => {
  return <div className="flex flex-col inp-group">{children}</div>;
};

export const EditTask = () => {
  const { task } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="task-form">
      <div className="  text-white p-4 w-full flex flex-col gap-5">
        <div className="flex justify-between">
          <button className="text-gray opacity-50" onClick={() => navigate(-1)}>
            X
          </button>
        </div>
        <InputGroup>
          <h1 className="text-2xl font-bold mb-7">{task.title}</h1>

          <FormInput
            name={"title"}
            placeholder={"e.g Take coffee break"}
            defaultValue={task.title}
          ></FormInput>
        </InputGroup>
        <InputGroup>
          <FormInput
            name={"description"}
            element={"textarea"}
            placeholder={
              "e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            }
            defaultValue={task.description}
            addClasses={"h-36"}
          ></FormInput>
        </InputGroup>
        <InputGroup>
          <button
            type="button"
            className="text-purple bg-white hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
          >
            + Add New Subtask
          </button>

          <ul>
            {task.subtasks &&
              task.subtasks.map((subtask) => (
                <li key={subtask.title}>
                  <p className="text-gray">{subtask.title}</p>
                </li>
              ))}
          </ul>
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
