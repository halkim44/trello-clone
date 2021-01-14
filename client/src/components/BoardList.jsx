import React from "react";
import { Link } from "react-router-dom";

export const BoardList = ({
  boards,
  variant = "personal_boards",
  children,
}) => {
  const listComponents = boards.map((board, i) => {
    const boardId = board._id;

    return (
      <li key={i} className="column is-one-quarter">
        <Link to={`/b/${boardId}/${board.title.replace(/\s/g, "-")}`}>
          <div className="board-tile has-background-danger has-text-white">
            {board.title}
          </div>
        </Link>
      </li>
    );
  });
  return (
    <>
      <ul className="columns is-multiline is-variable is-2">
        {listComponents}
        {variant !== "recent_boards" && (
          <li className="column is-one-quarter">{children}</li>
        )}
      </ul>
    </>
  );
};
