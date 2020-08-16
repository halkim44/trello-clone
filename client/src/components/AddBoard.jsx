import React, { useState } from 'react';
import { api, socket } from '../api';

export const AddBoard = ({ user, addBoardToState }) => {

  const [boardTitle, setBoardTitle] = useState('')

  const onChange = e => {
    setBoardTitle(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newBoard = {
      title: boardTitle,
      userId: user.id
    }
    const form = e.target;
    api
      .post('/board', newBoard)
      
      .then(res => {
        addBoardToState( res.data.board );
        form.reset();
      })

  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            id="title"
            placeholder="Add board title"
            onChange={onChange}
         />
        </div>
        <div>
          <button type="submit">
            Create new board
          </button>
        </div>
      </form>
    </>
  )
}