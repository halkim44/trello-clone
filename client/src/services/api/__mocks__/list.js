import { exampleListObject } from "../../../tests/fixtures/listExampleObj";

export const createNewList = () =>
  Promise.resolve({
    data: {
      card_group: exampleListObject,
    },
  });
