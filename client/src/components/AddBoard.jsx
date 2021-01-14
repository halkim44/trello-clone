import React, { useRef, useState } from "react";
import { useOverlayToggler } from "../hooks";
import { createNewBoard } from "../services/api/board";

export const AddBoard = ({ user, addBoardToState }) => {
  const [boardTitle, setBoardTitle] = useState("");

  const addBoardOverlayRef = useRef();
  const { showOverlay, toggleDisplayOverlay } = useOverlayToggler(
    addBoardOverlayRef
  );
  const onChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      title: boardTitle,
      userId: user.id,
    };
    const form = e.target;
    createNewBoard(newBoard).then((res) => {
      addBoardToState(res.data.board);
      form.reset();
      toggleDisplayOverlay();
    });
  };
  return (
    <>
      <div className="" id="addBoardModal">
        <div className="">
          <button
            className="button board-tile is-light is-fullwidth"
            onClick={toggleDisplayOverlay}
          >
            Create new Board
          </button>
        </div>
        {/* <div className="modal-background" onClick={toggleDisplayOverlay}></div> */}
        {showOverlay && (
          <div className="overlay">
            <div className="add-board-form-wrapper" ref={addBoardOverlayRef}>
              <form onSubmit={onSubmit}>
                <div className="add-board-form-wrapper--input-wrapper has-background-danger">
                  <input
                    type="text"
                    className="input has-background-danger has-text-white"
                    id="title"
                    placeholder="Add board title"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <button type="submit" className="button is-success">
                    Create Board
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
