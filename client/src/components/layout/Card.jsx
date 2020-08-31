import React from 'react';

export const Card = ({ data }) => {
  return (
    <div className="card" draggable>
      <p>{data.content}</p>
    </div>
  )
}