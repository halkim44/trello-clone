import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  screen,
  within,
} from "@testing-library/react";
import { render } from "../tests/custom-render";
import { MemoryRouter } from "react-router-dom";
import { userLoggedIn } from "../tests/fixtures/auth-state";
import App from "../app";
import { recentBoardsExample } from "../tests/fixtures/boards";
import { createNewBoard } from "../services/api/board";

afterEach(cleanup);

const newBoardExample = {
  title: "board title example",
  _id: "board-id-1",
};
// should render top menu
jest.mock("../services/api/board").mock("../utils/recentBoardLocalStorage");
test("should render Home page", async () => {
  createNewBoard.mockResolvedValue({
    success: true,
    data: {
      board: newBoardExample,
    },
  });
  const { debug } = render(
    <MemoryRouter initialEntries={[`/${userLoggedIn.userFullName}/boards`]}>
      <App />
    </MemoryRouter>,
    {
      initialState: {
        auth: userLoggedIn,
      },
    }
  );
  // should render Personal boards section title
  screen.getByText("Personal Boards");
  // should render Recent boards section title
  screen.getByText("Recent Boards");
  // should render top 4 recent boards
  recentBoardsExample.forEach((board) => {
    screen.getByText(board.title);
  });
  // should render "create new board" button
  const BoardComposerBtn = screen.getByText("Create new Board");
  // should render sidebar
  screen.getAllByText("Boards");
  screen.getByText("Templates");
  screen.getByText("Home");

  // Board composer modal component is not displayed before clicking Create new Board Button
  expect(screen.queryByPlaceholderText("Add board title")).toBeFalsy();

  fireEvent.click(BoardComposerBtn);
  // Board composer is now displayed after clicking Create new Board Button
  const boardTitleInput = await screen.findByPlaceholderText("Add board title");

  fireEvent.change(boardTitleInput, {
    target: { value: newBoardExample.title },
  });
  const submitButton = await screen.findByText("Create Board");
  fireEvent.click(submitButton);

  // should render the new board
  await screen.findByText("board title example");

  // Should close Board composer modal after submitting
  expect(screen.queryByPlaceholderText("Add board title")).toBeNull();
  // should success submitting form to api
  expect(createNewBoard).toHaveBeenCalledWith({
    title: newBoardExample.title,
    userId: userLoggedIn.user.id,
  });
});
