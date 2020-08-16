import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../../actions/authActions';
import { getBoardList } from '../../actions/boardActions';
import { AddBoard } from '../AddBoard';
import { BoardList } from '../BoardList';


const Home = props => {

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  }
  const [boards, setBoards] = useState([]);
  
  useEffect(() => {
    if(boards.length === 0) {
      props.getBoardList(props.auth.user.id);
    }
    setBoards([...props.boards.boards]);
  }, [props.boards.boards])

  return (
    <div>
      <h1>helo, {props.auth.user.full_name}</h1>
      <AddBoard user={props.auth.user} addBoardToState={newboard => setBoards([...boards, newboard])}/>
      <BoardList boards={boards}/>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  )
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  boards: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  boards: state.boards
})

export default connect(
  mapStateToProps,
  { logoutUser, getBoardList }
)(Home);
