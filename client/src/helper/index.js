import { serverAPI } from "../services/serverAPI";

export const updateOrderOfListsOnBoard = (boardId, newCardGroupOrder) => {
  serverAPI
    .post("/board/card-group-order", { boardId, newCardGroupOrder })
    .then((res) => {
      console.log(res);
    });
};
