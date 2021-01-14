import React, { useState, useRef, useEffect } from "react";
import fitTextarea from "fit-textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createNewCard } from "../services/api/card";

export const AddCard = ({ boardId, listId, addCardToState }) => {
  const [content, setContent] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsComposerOpen(false);
    }
  }
  const createCard = (e) => {
    e.preventDefault();

    const form = e.target;
    setIsComposerOpen(false);
    form.reset();
    setContent("");
    createNewCard(content, boardId, listId).then((res) => {
      console.log("data added");
      addCardToState(res.data.card);
    });
  };
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (isComposerOpen) {
      const textarea = document.querySelector(".card-composer textarea");
      fitTextarea.watch(textarea);
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [isComposerOpen]);

  return (
    <div className="composer card-composer">
      {isComposerOpen ? (
        <form onSubmit={createCard} ref={wrapperRef}>
          <div>
            <textarea
              rows={1}
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              autoFocus
              placeholder="Enter a title for this card..."
            ></textarea>
          </div>
          <div>
            <button
              className="button is-success is-size-7 card-composer-submit-btn"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </form>
      ) : (
        <button
          className="open-composer-btn"
          onClick={() => setIsComposerOpen(true)}
        >
          <span className="btn-icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span>Add another card</span>
        </button>
      )}
    </div>
  );
};
