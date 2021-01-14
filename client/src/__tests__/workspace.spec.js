import React from "react";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { render } from "../tests/custom-render";
import { MemoryRouter } from "react-router-dom";
import { userLoggedIn } from "../tests/fixtures/auth-state";
import App from "../app";
import { BoardDataResObj } from "../tests/fixtures/boards";
import { exampleListObject } from "../tests/fixtures/listExampleObj";
import { newCardExampleObj } from "../tests/fixtures/cardExampleObj";

afterEach(cleanup);

jest
  .mock("../services/api/list")
  .mock("../services/api/card")
  .mock("../services/api/board");
test("should render Workspace page", async () => {
  render(
    <MemoryRouter
      initialEntries={[
        `/b/${BoardDataResObj.data.data._id}/${BoardDataResObj.data.data.title}`,
      ]}
    >
      <App />
    </MemoryRouter>,
    {
      initialState: {
        auth: userLoggedIn,
      },
    }
  );
  // board title is displayed
  await screen.findByText(BoardDataResObj.data.data.title);
  const listArray = [];
  // all list is displayed
  BoardDataResObj.data.data.card_groups.forEach((list) => {
    listArray.push(screen.getByTestId(list._id));
  });

  listArray.forEach((list, listIndex) => {
    const { getByTestId } = within(list);

    const cardsInsideListId =
      BoardDataResObj.data.data.card_groups[listIndex].card_order;

    // every cards is inside of the correct list parent
    cardsInsideListId.forEach((cardId) => {
      getByTestId(cardId);
    });
  });
  // list composer is working
  fireEvent.click(screen.getByText("Add another list"));
  // should render an input for list title
  const listTitleInput = await screen.findByPlaceholderText(
    "Enter list title ..."
  );
  // should render submit button for list composer
  const listSubmitBtn = await screen.findByText("Add List");
  // card composer is working

  // input title
  fireEvent.change(listTitleInput, {
    target: { value: exampleListObject.title },
  });
  // submit
  fireEvent.click(listSubmitBtn);
  // check if newly created list is rendered
  await screen.findByText(exampleListObject.title);

  // card composer test
  const { getByText, queryByText, findByPlaceholderText, findByText } = within(
    listArray[0]
  );

  fireEvent.click(getByText("Add another card"));
  // the button will not be displayed
  expect(queryByText("Add another card")).toBeNull();
  // await findByText("Add another card");
  const cardTitleInputEl = await findByPlaceholderText(
    "Enter a title for this card..."
  );
  fireEvent.change(cardTitleInputEl, {
    target: {
      value: newCardExampleObj.content,
    },
  });
  fireEvent.click(getByText("Add Task"));
  // new card is rendered
  await findByText(newCardExampleObj.content);

  // list composer wont create list when no user input

  // card composer wont create list when no user input
});
