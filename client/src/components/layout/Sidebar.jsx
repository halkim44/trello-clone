import React from 'react';

export const Sidebar = ({onLogoutClick}) => {
  return (
    <aside className="menu">
      <ul className="menu-list">
        <li><a className="is-active" href="/">Boards</a></li>
      </ul>
      <p className="menu-label">
        ACCOUNT
      </p>
      <ul className="menu-list">
        <li><span onClick={ onLogoutClick } className="logout-btn">Log out</span></li>
      </ul>
      <p className="menu-label"></p>

    </aside>
  )
}