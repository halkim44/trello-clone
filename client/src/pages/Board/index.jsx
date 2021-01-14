import React, { useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import isEmpty from "is-empty";
import { PropTypes } from "prop-types";
import { useRouteMatch } from "react-router-dom";

import { List } from "../../components/layout/List";
import { AddCard } from "../../components/AddCard";
import { updateOrderOfListsOnBoard } from "../../helper/index";
import { updateListCardOrder } from "../../services/api/lists";
import { ListComposer } from "./ListComposer";
import { TopMenu } from "../../components/TopMenu";
import { addRecentBoard } from "../../utils/recentBoardLocalStorage";
import { requestBoardData } from "../../services/api/board";
import { createNewList } from "../../services/api/list";

const Board = (props) => {
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState({});
  const [lists, setLists] = useState([]);

  const { boardId } = useRouteMatch().params;
  const { auth } = props;

  const updateCard = (newCard) => {
    const newLists = [...lists];
    const listSource = newLists.find((list) => list._id === newCard.card_group);
    setCards({ ...cards, [newCard._id]: newCard });
    listSource.card_order.push(newCard._id);
    setLists(newLists);
  };

  if (isEmpty(board)) {
    ((id) => {
      requestBoardData(id)
        .then((res) => {
          const boardObj = res.data.data;
          // check if some of the users of the board match the current user
          if (boardObj.users.some((user) => user.userId === auth.user.id)) {
            addRecentBoard(auth.user.id, {
              title: boardObj.title,
              _id: boardObj._id,
            });

            setBoard({
              title: boardObj.title,
              labels: boardObj.available_Label,
              isClosed: boardObj.is_closed,
            });
            setLists(boardObj.card_groups);
            const cardObj = {};
            boardObj.cards.forEach((card) => (cardObj[card._id] = card));
            setCards(cardObj);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })(boardId);
  }

  const createList = (listTitle) => {
    createNewList(listTitle, boardId).then((res) => {
      setLists([...lists, res.data.card_group]);
      console.log("list added to database");
    });
  };

  const updateListPosition = (source, destination) => {
    const listArray = Array.from(lists);
    const [droppedListObject] = listArray.splice(source.index, 1);
    listArray.splice(destination.index, 0, droppedListObject);

    setLists(listArray);

    updateOrderOfListsOnBoard(
      boardId,
      listArray.map((list) => list._id)
    );
  };

  const updateCardPosition = (source, destination, draggableId) => {
    const newLists = [...lists];
    const droppableList = newLists.find(
      (list) => list._id === source.droppableId
    );
    const newCardOrder = Array.from(droppableList.card_order);
    newCardOrder.splice(source.index, 1);
    droppableList.card_order = newCardOrder;
    if (source.droppableId === destination.droppableId) {
      newCardOrder.splice(destination.index, 0, draggableId);
    } else {
      const listDestination = newLists.find(
        (list) => list._id === destination.droppableId
      );
      const newCardOrderDestination = Array.from(listDestination.card_order);
      newCardOrderDestination.splice(destination.index, 0, draggableId);
      listDestination.card_order = newCardOrderDestination;
      updateListCardOrder(destination.droppableId, newCardOrderDestination);
    }
    updateListCardOrder(source.droppableId, newCardOrder);
    setLists(newLists);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (destination !== null) {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      } else if (type === "list") {
        updateListPosition(source, destination);
      } else {
        updateCardPosition(source, destination, draggableId);
      }
    }
  };

  return (
    <>
      <TopMenu />
      <div className="board-title-wrapper level is-size-5 has-background-info">
        <div className="level-left">
          <div className="level-item">
            <h1 className="board-title has-text-light">{board.title}</h1>
          </div>
        </div>
      </div>
      <div className="workspace has-background-info">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((data, i) => (
                  <List
                    key={data._id}
                    data={data}
                    cards={
                      isEmpty(cards)
                        ? []
                        : data.card_order.map((card) => cards[card])
                    }
                    index={i}
                  >
                    <AddCard
                      boardId={boardId}
                      listId={data._id}
                      addCardToState={updateCard}
                    />
                  </List>
                ))}
                {provided.placeholder}
                <ListComposer listCreator={createList} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

Board.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Board);
