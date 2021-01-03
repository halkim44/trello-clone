import React, { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isEmpty from "is-empty";

import { serverAPI } from "../../services/serverAPI";
import store from "../../store";
import { List } from "../../components/layout/List";
import { AddCard } from "../../components/AddCard";
import { Navbar } from "../../components/layout/Navbar";
import { updateBoardListOrder } from "../../helper/index";
import { useRouteMatch } from "react-router-dom";
import { updateListCardOrder } from "../../services/api/lists";

export const Board = () => {
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState({});
  const [lists, setLists] = useState([]);
  const [formData, setFormData] = useState({});
  const [displayListComposer, setDisplayListComposer] = useState(false);

  const boardId = useRouteMatch().params.boardId;
  const state = store.getState();
  const wrapperRef = useRef(null);
  /**
   *
   * @param {*} newCard
   */
  const updateCard = (newCard) => {
    const newLists = [...lists];
    const listSource = newLists.find((list) => list._id === newCard.card_group);
    setCards({ ...cards, [newCard._id]: newCard });
    listSource.card_order.push(newCard._id);
    setLists(newLists);
  };

  if (isEmpty(board)) {
    ((id) => {
      serverAPI
        .get(`/board/${id}`)
        .then((res) => {
          const boardObj = res.data.data;
          // check if some of the users of the board match the current user
          if (
            boardObj.users.some((user) => user.userId === state.auth.user.id)
          ) {
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

  // ** list Composer toggle Start
  if (displayListComposer) {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDisplayListComposer(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }
  // ** list Composer toggle end

  const InnerList = ({ listsData, index }) => {
    return (
      <List
        key={listsData._id}
        data={listsData}
        cards={
          isEmpty(cards) ? [] : listsData.card_order.map((card) => cards[card])
        }
        index={index}
      >
        <AddCard
          boardId={boardId}
          listId={listsData._id}
          addCardToState={useCallback(updateCard, [])}
        />
      </List>
    );
  };

  const createList = (e) => {
    e.preventDefault();
    const newList = {
      title: formData.listTitle,
      is_archived: false,
      board: boardId,
    };
    const form = e.target;
    form.reset();
    setDisplayListComposer(false);

    serverAPI.post("/card-group", newList).then((res) => {
      setLists([...lists, res.data.card_group]);
      console.log("list added to database");
    });
  };

  const onChange = (e) => {
    const userInput = Object.assign({}, formData);
    userInput[e.target.id] = e.target.value;
    setFormData(userInput);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const listArray = Array.from(lists);
      const [droppedListObject] = listArray.splice(source.index, 1);
      listArray.splice(destination.index, 0, droppedListObject);

      setLists(listArray);

      updateBoardListOrder(
        boardId,
        listArray.map((list) => list._id)
      );

      return;
    }

    const newLists = [...lists];

    if (source.droppableId === destination.droppableId) {
      const droppableList = newLists.find(
        (list) => list._id === source.droppableId
      );
      const newCardOrder = Array.from(droppableList.card_order);
      newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, draggableId);
      droppableList.card_order = newCardOrder;

      setLists(newLists);

      updateListCardOrder(source.droppableId, newCardOrder);
    } else {
      const listSource = newLists.find(
        (list) => list._id === source.droppableId
      );
      const listDestination = newLists.find(
        (list) => list._id === destination.droppableId
      );
      const newCardOrderSource = Array.from(listSource.card_order);
      const newCardOrderDestination = Array.from(listDestination.card_order);

      newCardOrderSource.splice(source.index, 1);
      newCardOrderDestination.splice(destination.index, 0, draggableId);

      listSource.card_order = newCardOrderSource;
      listDestination.card_order = newCardOrderDestination;
      setLists(newLists);
      updateListCardOrder(source.droppableId, newCardOrderSource);
      updateListCardOrder(destination.droppableId, newCardOrderDestination);
    }
  };

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((data, i) => (
                  <InnerList key={data._id} listsData={data} index={i} />
                ))}

                {provided.placeholder}

                {displayListComposer ? (
                  <div className="list-composer composer">
                    <form onSubmit={createList} ref={wrapperRef}>
                      <div>
                        <input
                          type="text"
                          className="input is-size-7"
                          id="listTitle"
                          placeholder="Enter list title ..."
                          onChange={onChange}
                          autoFocus
                        />
                      </div>
                      <div>
                        <button
                          className="button is-success is-size-7 card-composer-submit-btn"
                          type="submit"
                        >
                          Add List
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="open-composer-btn-container">
                    <btn
                      className="open-composer-btn list-composer-btn"
                      onClick={() => setDisplayListComposer(true)}
                    >
                      <span className="btn-icon">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Add another list
                    </btn>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default connect()(Board);
