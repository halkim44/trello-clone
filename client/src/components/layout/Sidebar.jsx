import React from 'react';

export const Sidebar = ({onLogoutClick}) => {
  return (
    <aside class="menu">
      <ul class="menu-list">
        <li><a class="is-active">Boards</a></li>
      </ul>
      <p class="menu-label">
        ACCOUNT
      </p>
      <ul class="menu-list">
        <li><a onClick={ onLogoutClick }>Log out</a></li>
      </ul>
      <p class="menu-label"></p>

    </aside>
  )
}