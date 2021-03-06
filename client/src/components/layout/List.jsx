import React from "react";
import { Card } from "./Card";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const List = ({ data, cards, index, children }) => {
  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          className="scroll-wrapper"
          {...provided.draggableProps}
          ref={provided.innerRef}
          data-testid={data._id}
        >
          <div className="list-wrapper has-text-black">
            <div className="title-menu-wrapper" {...provided.dragHandleProps}>
              <h3>{data.title}</h3>
            </div>
            <Droppable droppableId={data._id} type="card">
              {(provided) => (
                <div
                  className="cards-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cards.map((card, index) => (
                    <Card key={card._id} data={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};
