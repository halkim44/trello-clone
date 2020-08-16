import React from 'react';

export const List = ({ list, children }) => {

  return (
    <div className="list-wrapper">
      <h1>{list.title}</h1>
      <div className="list-item">
        { children }
      </div>

    </div>
  )
}
