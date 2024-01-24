import localforage from "localforage";
// import { matchSorter } from "match-sorter";

export async function loadBoards() {
  console.log("loadboards triggered");

  try {
    const url = "src/api/data.json";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch api data");
    }
    const savedBoards = await response.json();
    console.log(savedBoards);
    set(savedBoards.boards);
  } catch (error) {
    console.error("Errorss fetching tasks", error);
  }
}

export async function getBoards(query) {
  console.log("getboards triggered");
  await fakeNetwork(`getBoards:${query}`);
  let boards = await localforage.getItem("boards");
  if (!boards) {
    loadBoards();
    let boards = await localforage.getItem("boards");
    return boards;
  }
  //   if (!boards) boards = [];
  return boards;
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
        if (task.title === taskName.substring(1)) {
          return task;
        }
      }
    }
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
