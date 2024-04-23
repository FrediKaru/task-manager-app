import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData, Form, redirect } from "react-router-dom";
import { getTaskByName, updateTask } from "./../boards";

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-900 dark:text-white";

export async function action({ request, params }) {
  const formData = await request.formData();
  let updates = Object.fromEntries(formData);
  updates = { ...updates, subtasks: JSON.parse(updates.subtasks) };
  await updateTask(params.taskTitle, updates);
  return redirect(`/boards/${params.boardId}`);
}

export async function loader({ params }) {
  const task = await getTaskByName(params.taskTitle);
  return { task };
}
const Label = ({ name }) => {
  return (
    <label className={labelClass} htmlFor={name}>
      {name.charAt(0).toUpperCase()}
      {name.slice(1)}
    </label>
  );
};
const Input = ({
  name,
  onChange,
  type = "text",
  element = "input",
  defaultValue = "",
  placeholder = "",
  addClasses = "",
}) => {
  const Element = element;
  return (
    <Element
      type={type}
      id={name}
      name={name}
      className={`${inputClass} ${addClasses || ""}`}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    ></Element>
  );
};

const LabelInput = ({
  name,
  type = "text",
  element = "input",
  placeholder = "",
  defaultValue = "",
  addClasses,
}) => {
  return (
    <>
      <Label name={name} />
      <Input
        type={type}
        id={name}
        name={name}
        element={element}
        placeholder={placeholder}
        defaultValue={defaultValue}
        addClasses={addClasses}
      />
    </>
  );
};

const InputGroup = ({ children }) => {
  return <div className="flex flex-col inp-group">{children}</div>;
};

export const EditTask = () => {
  const [subtaskInput, setSubtaskInput] = useState("");
  const { task } = useLoaderData();
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(task.id);
  }, []);

  function addSubTask() {
    setSubtasks([...subtasks, { title: subtaskInput, isCompleted: false }]);
    setSubtaskInput("");
  }

  function removeSubTask(title) {
    setSubtasks((prevSubtasks) => {
      const updated = prevSubtasks.filter((task) => task.title !== title);
      return updated;
    });
  }

  return (
    <Form method="post" id="task-form">
      <div className="  text-white p-4 w-full flex flex-col gap-5">
        <div className="flex justify-between">
          <button className="text-gray">X</button>
        </div>
        <InputGroup>
          <h1 className="text-2xl font-bold mb-7">{task.title}</h1>
          <LabelInput
            name={"title"}
            placeholder={"e.g Take coffee break"}
            defaultValue={task.title}
          ></LabelInput>
        </InputGroup>
        <InputGroup>
          <LabelInput
            name={"description"}
            element={"textarea"}
            placeholder={
              "e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            }
            defaultValue={task.description}
            addClasses={"h-36"}
          ></LabelInput>
        </InputGroup>
        <Label name={"subtasks"} />

        {subtasks &&
          subtasks.map((subtask, index) => (
            <div className="flex gap-5" key={subtask.title}>
              <p
                name={`subtask-${index}`}
                defaultValue={subtask.title}
                style={{ background: "inherit", border: "inherit" }}
              >
                {subtask.title}
              </p>
              <button
                type="button"
                onClick={() => removeSubTask(subtask.title)}
              >
                X
              </button>
            </div>
          ))}
        <input
          type="hidden"
          name="subtasks"
          id="subtasks"
          defaultValue={JSON.stringify(subtasks)}
        />
        <div className="inp-group">
          <input
            className={inputClass}
            placeholder="e.g Call stakeholders"
            onChange={(e) => setSubtaskInput(e.target.value)}
            value={subtaskInput}
          ></input>
        </div>
        <button
          type="button"
          onClick={addSubTask}
          className="text-purple bg-white hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
        >
          + Add New Subtask
        </button>

        <Label name={"status"} />
        <div className="inp-group">
          <select
            defaultValue={task.status}
            className={`${inputClass}`}
            name="status"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Doing">Done</option>
          </select>
        </div>
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
