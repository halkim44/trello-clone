import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { api } from '../../api';
import isEmpty from 'is-empty';
import store from '../../store';
import { List } from './List';
import { AddCard } from '../AddCard';
import { Card } from './Card';
import { Navbar } from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const Board = props =>{
  
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState([]);
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({})
  const [displayListComposer, setDisplayListComposer] = useState(false)
  
  const boardId = props.location.pathname.split("/")[2];
  const state = store.getState();
  const wrapperRef = useRef(null);

  useEffect(() => {

    console.log('board updated');

    if(displayListComposer) {

      const input = document.querySelector('.list-composer input');

      function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setDisplayListComposer(false)
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
    }

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
  }, [displayListComposer])




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
          <div className="cards-container">
            { listCards }
            <AddCard boardId={ boardId } listId={ list._id } addCardToState={newCard => setCards([...cards, newCard])}/>
          </div>
        </List>
        )
      })
    }
  }

  const getCards = listId => (
    cards.filter( card => card.card_group === listId )
  )


  return (
    <>
      <Navbar />
      
      <div className="board-title-wrapper level is-size-5 has-background-info">
        <div className="level-left">
          <div className="level-item">
            <h1 className="board-title has-text-light">{board.title}</h1>
          </div>
        </div>
      </div>
      <div className="workspace has-background-info">
        <div className="lists-container">
          {displayLists(list)}

            { displayListComposer ?

            <div className="list-composer composer">
              <form onSubmit={ createList } ref={wrapperRef}>
                <div>
                  <input
                     type="text"
                     className="input is-size-7"
                     id="listTitle"
                     placeholder="Enter list title ..."
                     onChange={onChange}
                  />
                </div>
                <div>
                  <button className="button is-success is-size-7 card-composer-submit-btn" type="submit">
                    
                  Add List
                  </button>
                </div>
              </form>
            </div>
            :
            <div className="open-composer-btn-container">
              <a className="open-composer-btn list-composer-btn" onClick={() => setDisplayListComposer(true)}>
                <span className="btn-icon">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Add another list
                </a>
            </div>
            }
          </div>
      </div>
    </>
  )
}

export default connect()(Board);