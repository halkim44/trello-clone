import React from 'react';
import { useState } from 'react';
import { api } from '../api';

export const AddCard = ({ boardId, listId, addCardToState }) => {

  const [content, setContent] = useState('');
  const createCard = e => {
    e.preventDefault();
    const newCard = {
      content,
      board: boardId,
      card_group: listId
    }
    const form = e.target;
    api
      .post('/card', newCard)
      .then(res => {
        addCardToState(res.data.card);
        form.reset();
      })
  }
  
  return (
    <div>
      <form onSubmit={ createCard }>
        <div>
          <textarea id="content" onChange={ e => setContent(e.target.value) }>

          </textarea>
        </div>
        <div>
          <button>Add Task</button>
        </div>
      </form>
    </div>
  )
}