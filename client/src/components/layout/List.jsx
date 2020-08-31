import React, { Children } from 'react';

export const List = ({ list, children }) => {

  return (
    <div className="scroll-wrapper">
            <div className="list-wrapper has-text-black">
              <div className="title-menu-wrapper">
                <h3>{list.title}</h3>
              </div>
              { children }
            </div>
          </div>
  )
}