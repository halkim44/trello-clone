import React, { useState } from 'react';
import { api, socket } from '../api';
import store from '../store';
import { toggleModal } from '../helper';

export const AddBoard = ({ user, addBoardToState, isActive }) => {
  console.log(store.getState())
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
        toggleModal();
      })

  }
  return (
    <>
      <div class='modal' id="addBoardModal">
        <div class="modal-background" onClick={  toggleModal }></div>
        <div class="modal-content">
          <div className="add-board-form-wrapper">
            <form onSubmit={onSubmit}>
              <div className="add-board-form-wrapper--input-wrapper has-background-danger">
                <input
                  type="text"
                  className="input has-background-danger has-text-white"
                  id="title"
                  placeholder="Add board title"
                  onChange={onChange}
               />
              </div>
              <div>
                <button type="submit" className="button is-success">
                  Create new board
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}