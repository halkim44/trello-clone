import { api } from '../api';

export const updateListCardOrder = (listId, newCardOrder) => {
  api
  .post('/card-group/card-order', {listId, newCardOrder})
  .then(res => {
    console.log(res);
  })
}

export const updateBoardListOrder = (boardId, newCardGroupOrder) => {
  api
  .post('/board/card-group-order', {boardId, newCardGroupOrder})
  .then(res => {
    console.log(res);
  })
}