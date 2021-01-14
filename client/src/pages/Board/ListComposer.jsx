import React, { useEffect, useRef, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ListComposer = ({ listCreator }) => {
  const [displayListComposer, setDisplayListComposer] = useState(false);
  const [listTitle, setListTitle] = useState(null);

  const wrapperRef = useRef(null);

  const onChange = (e) => {
    setListTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    listCreator(listTitle);
    const form = e.target;
    form.reset();
    setDisplayListComposer(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDisplayListComposer(false);
      }
    }
    if (displayListComposer) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayListComposer]);

  return (
    <>
      {displayListComposer ? (
        <div className="list-composer composer">
          <form onSubmit={onSubmit} ref={wrapperRef}>
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
          <button
            className="open-composer-btn list-composer-btn"
            onClick={() => setDisplayListComposer(true)}
          >
            <span className="btn-icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Add another list
          </button>
        </div>
      )}
    </>
  );
};
