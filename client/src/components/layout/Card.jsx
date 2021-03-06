import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Card = ({ data, index }) => {
  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid={data._id}
        >
          <p>{data.content}</p>
        </div>
      )}
    </Draggable>
  );
};
