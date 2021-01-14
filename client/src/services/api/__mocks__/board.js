import {
  recentBoardsExample,
  BoardDataResObj,
} from "../../../tests/fixtures/boards";

export const requestBoards = () =>
  Promise.resolve({
    data: {
      success: true,
      data: recentBoardsExample,
    },
  });

export const requestBoardData = () => Promise.resolve(BoardDataResObj);

export const createNewBoard = jest.fn();
