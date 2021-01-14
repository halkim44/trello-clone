import { newCardExampleObj } from "../../../tests/fixtures/cardExampleObj";

export const createNewCard = () =>
  Promise.resolve({
    data: {
      success: true,
      card: newCardExampleObj,
      message: "Card created!",
    },
    status: 201,
    statusText: "Created",
  });
