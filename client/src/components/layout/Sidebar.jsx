import React from 'react';

export const Sidebar = ({onLogoutClick}) => {
  return (
    <aside className="menu">
      <ul className="menu-list">
        <li><a className="is-active">Boards</a></li>
      </ul>
      <p className="menu-label">
        ACCOUNT
      </p>
      <ul className="menu-list">
        <li><a onClick={ onLogoutClick }>Log out</a></li>
      </ul>
      <p className="menu-label"></p>

    </aside>
  )
}