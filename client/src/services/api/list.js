import { serverAPI } from "../serverAPI";

export const createNewList = (title, boardId) =>
  serverAPI.post("/card-group", {
    title: title,
    is_archived: false,
    board: boardId,
  });
