import React, { useState } from "react";

import { Form } from "react-router-dom";

export default function AddBoard() {
  const [boardInputVisible, setBoardInputVisible] = useState(false);

  function handleBoardInput() {
    setBoardInputVisible(!boardInputVisible);
  }
  return (
    <>
      {boardInputVisible ? (
        <Form method="post" onSubmit={handleBoardInput}>
          <input name="name"></input>
          <button
            type="submit"
            className="bg-purple rounded-full px-5 py-1 text-sm mt-4 text-white"
          >
            Add board
          </button>
        </Form>
      ) : (
        <button type="button" className="text-gray" onClick={handleBoardInput}>
          Add new board +
        </button>
      )}
    </>
  );
}
