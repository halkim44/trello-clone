import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../../actions/authActions';
import { getBoardList } from '../../actions/boardActions';
import { AddBoard } from '../AddBoard';
import { BoardList } from '../BoardList';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';


const Home = props => {

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  }
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    if(props.boards.boards.length === 0) {
      props.getBoardList(props.auth.user.id);
    } else {
      setBoards([...props.boards.boards])
    }
    console.log(props);
  }, [props])

  return (
    <>
      <Navbar/>
      <div className="container margin-t-50 padding-lr-120">
        <div className="columns">
          <div className="column is-3">
            <Sidebar onLogoutClick={ onLogoutClick }/>
          </div>
          <div className="column is-9">
            <BoardList boards={boards}/>
          </div>
        </div>
        <AddBoard user={props.auth.user} addBoardToState={newboard => setBoards([...boards, newboard])}/>
      </div>
    </>
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
