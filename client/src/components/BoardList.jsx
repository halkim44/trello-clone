import React, { useState } from 'react';
import { api } from '../api';
import { Link, Route } from 'react-router-dom';
import { toggleModal } from '../helper';

export const BoardList = props => {

  const { boards } = props;
  const listComponents = boards.map((board, i) => {
    const boardId = board._id;
    
    return (
      <li
        key={i}
        className="column is-one-quarter"
      >
        <Link to={`/b/${boardId}/${board.title.replace(/\s/g, "-")}`}
        >
          <div 
            className="board-tile has-background-danger has-text-white"
          >
            {board.title}
          </div>
        </Link>
      </li>
    )
  })
  return (
    <>
      <h1 className="board-list-title is-size-6">Personal Boards</h1>

      <ul className="columns is-multiline is-variable is-2">
        {listComponents}
        <li className="column is-one-quarter">
          <div className="">
            <button class="button board-tile is-light is-fullwidth" onClick={ toggleModal }>Create new Board</button>
          </div>
        </li>
      </ul>
    </>
  )
}