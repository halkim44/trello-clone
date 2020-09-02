import React, { useState } from 'react';
import { api } from '../api';
import { toggleModal } from '../helper';

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
        toggleModal();
      })

  }
  return (
    <>
      <div className='modal' id="addBoardModal">
        <div className="modal-background" onClick={  toggleModal }></div>
        <div className="modal-content">
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