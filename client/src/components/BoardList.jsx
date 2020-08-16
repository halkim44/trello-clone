import React, { useState } from 'react';
import { api } from '../api';
import { Link, Route } from 'react-router-dom';

export const BoardList = props => {

  const { boards } = props;
  const listComponents = boards.map((board, i) => {
    console.log(board)
    const boardId = board._id;
    
    return (
      <>
        <li key={i}><Link to={`/b/${boardId}/${board.title.replace(/\s/g, "-")}`}>{board.title}</Link></li>
      </>
    )
  })
  return (
    <>
      <ul>
        {listComponents}
      </ul>
    </>
  )
}