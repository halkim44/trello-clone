import { serverAPI } from "../serverAPI";

export const createNewCard = (content, boardId, listId) =>
  serverAPI.post("/card", {
    content,
    board: boardId,
    card_group: listId,
  });
