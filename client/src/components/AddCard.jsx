import React, { useState, useRef, useEffect } from 'react';
import { api } from '../api';
import fitTextarea from 'fit-textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const AddCard = ({ boardId, listId, addCardToState }) => {

  const [content, setContent] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [data, setData] = useState(null)
  
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
        setData(res.data.card)
        form.reset();
        setContent('')
        setIsComposerOpen(false)
      })
  }
  const wrapperRef = useRef(null);
  useEffect(() => {
    if(isComposerOpen) {

      const textarea = document.querySelector('.card-composer textarea');
      fitTextarea.watch(textarea);

      function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsComposerOpen(false)
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
    }
    if(data !== null) {
      console.log(data);
      addCardToState(data);
    }
  }, [isComposerOpen]);

  return (
    <div className="composer card-composer">
      { isComposerOpen ? 
        <form onSubmit={ createCard } ref={wrapperRef}>
          <div>
            <textarea
              rows={1}
              id="content"
              onChange={ e => setContent(e.target.value) }
              value={content}
              autoFocus
              >

            </textarea>
          </div>
          <div>
            <button className="button is-success is-size-7 card-composer-submit-btn" type="submit">
              Add Task
            </button>
          </div>
        </form>
        :
        <a className="open-composer-btn" onClick={() => setIsComposerOpen(true)}>
          <span className="btn-icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Add another card
        </a>
      }
    </div>
  )
}