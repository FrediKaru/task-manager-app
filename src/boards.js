import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const userIdExample = "0caef751-fef4-41bd-9207-c06886b9605e";

const firebaseConfig = {
  databaseURL:
    "https://task-app-9b589-default-rtdb.europe-west1.firebasedatabase.app/",
};
// initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

import localforage from "localforage";
import { data } from "autoprefixer";
// import { matchSorter } from "match-sorter";

export async function loadBoards() {
  console.log("loading function triggeed");
  try {
    const url = "src/api/data.json";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch api data");
    }
    const savedBoards = await response.json();
    console.log(savedBoards);

    // set(ref(database, "users/" + userIdExample), {
    //   boards: savedBoards.boards,
    //   username: "fredi902",
    // });
  } catch (error) {
    console.error("Errorss fetching tasks", error);
  }
}
// addNewUserToDatabase("0caef751-fef4-41bd-9207-c06886b9605e", "fredi08");

// const likesCount = ref(database, "users/" + userIdExample + "/likes");
// onValue(likesCount, (snapshot) => {
//   const data = snapshot.val();
//   console.log("likes count is", data);
// });

export async function getBoards(
  userID = "0caef751-fef4-41bd-9207-c06886b9605e",
  query
) {
  await fakeNetwork(`getBoards:${query}`);
  const boardsRef = ref(database, "users/" + userID + "/boards");

  return new Promise((resolve, reject) => {
    onValue(
      boardsRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });

  //   if (!boards) boards = [];
}
export async function saveBoard(id, updatedBoard) {
  let userID = "0caef751-fef4-41bd-9207-c06886b9605e";

  const boardRef = ref(database, `users/${userID}/boards/${id}`);

  try {
    await set(boardRef, updatedBoard);

    //fetch the updated list of boards after updating firebase
    const boardsRef = ref(database, `users/${userID}/boards`);
    const snapshot = await get(boardsRef);
    const data = snapshot.val();

    if (data) {
      const updatedBoards = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return updatedBoards;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error updating board:", error);
    throw error;
  }
}

export async function getBoard(id) {
  let userID = "0caef751-fef4-41bd-9207-c06886b9605e";

  const boardRef = ref(database, "users/" + userID + "/boards/" + id);
  return new Promise((resolve, reject) => {
    onValue(
      boardRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
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
  localforage.setForageItem("boards", boards);
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
          await setForage(boards);
          return task;
        }
      }
    }
  }
}

export async function addBoard(name, id) {
  await fakeNetwork();
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
  await localforage.setForageItem("boards", updatedBoards);
}

export async function addTask(boardId, columnName, newTask) {
  await fakeNetwork(`card:${newTask.title}`);
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
  await localforage.setForageItem("boards", boards);
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
    await localforage.setForageItem("boards", boardsNew);
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
  await setForage(boards);
  return board;
}
async function addNewUserToDatabase(userID, username) {
  set(ref(database, "users/" + userID), {
    username: username,
    boards: [2, 3, 5],
  });
}

async function setForage(boards) {
  const user = {
    name: "Fredi",
    userID: "436424",
    boards: boards,
  };
  try {
    // set(ref(database, `users`), {
    //   boards: boards,
    // });
  } catch (error) {
    console.error("Error writing data: ", error);
  }

  return localforage.setForageItem("boards", boards);
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
