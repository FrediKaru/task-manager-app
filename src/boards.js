import localforage from "localforage";
import { mockData } from "./api/mockData";
// import { matchSorter } from "match-sorter";

export async function loadBoards() {
  console.log("loadboards triggered");

  try {
    // const url = "/src/api/data.json";
    // const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch API data");
    // }

    // const savedBoards = await response.json();
    const savedBoards = mockData;
    console.log(savedBoards);

    await localforage.setItem("boards", savedBoards.boards);

    return savedBoards.boards; // Return the fetched boards
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
}

export async function getBoards(query) {
  console.log("getboards triggered");

  try {
    await fakeNetwork(`getBoards:${query}`);

    let boards = await localforage.getItem("boards");

    if (!boards) {
      boards = await loadBoards();
    }

    return boards; // Return boards (either from local storage or fetched)
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error; // Propagate the error if needed
  }
}
export async function saveBoard(updatedBoard) {
  console.log("updated board is: ", updatedBoard);
  await fakeNetwork(`board:${updatedBoard.name}`);
  let boards = await localforage.getItem("boards");
  let updatedBoardIndex = boards.findIndex(
    (board) => board.name === updatedBoard.name
  );
  boards[updatedBoardIndex] = updatedBoard;
  await set(boards);
}

export async function getBoard(id) {
  console.log(id);
  await fakeNetwork(`board:${id}`);
  let boards = await localforage.getItem("boards");
  let board = boards.find((board) => board.id == id);
  console.log(board);
  return board ?? null;
}

export async function getTaskByName(taskName) {
  await fakeNetwork(`card:${taskName}`);
  let boards = await localforage.getItem("boards");

  for (const board of boards) {
    for (const column of board.columns) {
      for (const task of column.tasks) {
        if (task.title === taskName) {
          return task;
        }
      }
    }
  }
}
export async function saveTask(oldTask, updatedTask) {
  await fakeNetwork(`card:${oldTask.title}`);
  let boards = await localforage.getItem("boards");

  for (const board of boards) {
    for (const column of board.columns) {
      for (const task of column.tasks) {
        if (task.title === oldTask.title) {
          Object.assign(task, updatedTask);
        }
      }
    }
  }
  localforage.setItem("boards", boards);
}

export async function updateTask(oldTitle, updates) {
  console.log("updates is", updates);
  await fakeNetwork();
  let boards = await localforage.getItem("boards");

  for (const board of boards) {
    for (const column of board.columns) {
      for (const task of column.tasks) {
        if (task.title === oldTitle) {
          Object.assign(task, updates);
          await set(boards);
          return task;
        }
      }
    }
  }
}

export async function addBoard(name, id) {
  // await fakeNetwork();
  let boards = (await localforage.getItem("boards")) || [];
  let updatedBoards = [
    ...boards,
    {
      name: name,
      id: id,
      isActive: false,
      columns: [
        {
          name: "Todo",
          tasks: [
            {
              title: "Build UI for onboarding flow",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  await localforage.setItem("boards", updatedBoards);
}

export async function addTask(boardId, columnName, newTask) {
  // await fakeNetwork(`card:${newTask.title}`);
  let boards = await localforage.getItem("boards");
  for (const board of boards) {
    if (board.id == boardId) {
      for (const column of board.columns) {
        if (column.name == columnName) {
          column.tasks.push({
            title: newTask.title,
            description: "",
            status: "Todo",
            subtasks: [],
          });
        }
      }
    }
  }
  await localforage.setItem("boards", boards);
}

export async function saveBoardName(id, newName) {
  console.log("revieved id", id);
  console.log("revieved new name", newName);
  await fakeNetwork(`boards:${id}`);
  let boards = await localforage.getItem("boards");
  console.log("imported old boards:", boards);

  if (boards) {
    let boardsNew = boards.map((board) => {
      if (board.id == id) {
        console.log("ids matched", id, board.id);
        return { ...board, name: newName };
      }
      console.log("ids did not match", id, board.id);
      return board;
    });
    console.log("updated boards:", boardsNew);
    await localforage.setItem("boards", boardsNew);
  } else {
    console.log("Error: Unable to update board title");
  }
}

export async function createBoard() {
  console.log("createBoard triggered");

  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let board = { id, createdAt: Date.now() };
  let boards = await getBoards();
  boards.unshift(board);
  await set(boards);
  return board;
}

function set(boards) {
  return localforage.setItem("boards", boards);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
