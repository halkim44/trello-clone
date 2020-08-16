import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { api } from '../../api';
import isEmpty from 'is-empty';
import store from '../../store';
import { List } from './List';
import { AddCard } from '../AddCard';
import { Card } from './Card';

export const Board = props =>{
  
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState([]);
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({})
  
  const boardId = props.location.pathname.split("/")[2];
  const state = store.getState();

  useEffect(() => {
    console.log('board updated');
    if (isEmpty(board)) {
      (id => {
        api
          .get(`/board/${id}`)
          .then(res => {
            const boardObj = res.data.data;

            // check if some of the users of the board match the current user
            if (boardObj.users.some( user => user.userId === state.auth.user.id)) {
              setBoard({
                title: boardObj.title,
                labels: boardObj.available_Label,
                isClosed: boardObj.is_closed,                
              })
              setList(boardObj.card_groups);
              setCards(boardObj.cards);
            } else {
              // Board not found error
            }
          })
          .catch(err => {
            console.log(err);
          })
      })(boardId)
    }


  }, [])


  const createList = e => {
    e.preventDefault();
    const newList = {
      title: formData.listTitle,
      is_archived: false,
      board: boardId
    }
    const form = e.target;
    api
      .post('/card-group', newList)
      .then(res => {
        setList([...list, res.data.card_group])
        form.reset();
      })
  }

  const onChange = e => {
    const userInput = Object.assign({}, formData);
    userInput[e.target.id] = e.target.value;
    setFormData( userInput );
  }

  const displayLists = listArray => {
    console.log(cards);
    if(!isEmpty(listArray)) {
      return listArray.map(list => {
        
        // get all cards
        const listCards = getCards(list._id).map(card => (
          <Card data={ card } />
        ))

        return (
        <List list={list}>
          { listCards }
          <AddCard boardId={ boardId } listId={ list._id } addCardToState={newCard => setCards([...cards, newCard])}/>
        </List>
        )
      })
    }
  }

  const getCards = listId => (
    cards.filter( card => card.card_group === listId )
  )


  return (
    <div>
      <h1>{board.title}</h1>
      <form onSubmit={createList}>
        { console.log(board) }
        <div>
          <input
            type="text"
            id="listTitle"
            placeholder="Enter list title ..."
            onChange={onChange}
         />
        </div>
        <div>
          <button type="submit">
            Add List
          </button>
        </div>
      </form>
      <div className="board-canvas">
        {displayLists(list)}
      </div>
    </div>
  )
}

export default connect()(Board);