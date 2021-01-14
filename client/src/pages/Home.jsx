import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getBoardList } from "../actions/boardActions";
import { BoardList } from "../components/BoardList";
import { Sidebar } from "../components/layout/Sidebar";
import { TopMenu } from "../components/TopMenu";
import { getRecentBoards } from "../utils/recentBoardLocalStorage";
import { AddBoard } from "../components/AddBoard";

const Home = (props) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };
  const [boards, setBoards] = useState([]);
  const [recentBoards, setRecentBoards] = useState([]);
  useEffect(() => {
    if (props.boards.boards.length === 0) {
      props.getBoardList(props.auth.user.id);
    } else {
      setBoards([...props.boards.boards]);
    }
  }, [props]);

  useEffect(() => {
    setRecentBoards(getRecentBoards(props.auth.user.id));
  }, []);

  return (
    <>
      <TopMenu />
      <div className="container margin-t-50 padding-lr-120">
        <div className="columns">
          <div className="column is-3">
            <Sidebar onLogoutClick={onLogoutClick} />
          </div>
          <div className="column is-9">
            {!!recentBoards.length && (
              <div>
                <h2 className="board-list-title is-size-6 has-text-weight-bold">
                  Recent Boards
                </h2>
                <BoardList boards={recentBoards} variant="recent_boards" />
              </div>
            )}
            <div className="personal-board-container">
              <h2 className="board-list-title is-size-6 has-text-weight-bold">
                Personal Boards
              </h2>

              <BoardList boards={boards}>
                <AddBoard
                  user={props.auth.user}
                  addBoardToState={(newboard) =>
                    setBoards([...boards, newboard])
                  }
                />
              </BoardList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  boards: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  boards: state.boards,
});

export default connect(mapStateToProps, { logoutUser, getBoardList })(Home);
