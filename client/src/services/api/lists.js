import { serverAPI } from "../serverAPI";

export const updateListCardOrder = (listId, newCardOrder) => {
  serverAPI
    .post("/card-group/card-order", { listId, newCardOrder })
    .then((res) => {
      console.log(res);
    });
};
