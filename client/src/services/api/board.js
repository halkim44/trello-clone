import { serverAPI } from "../serverAPI";

export const requestBoards = (userId) =>
  serverAPI.post("/user/boards", { userId });

export const requestBoardData = (id) => serverAPI.get(`/board/${id}`);

export const createNewBoard = (newBoard) => serverAPI.post("/board", newBoard);
