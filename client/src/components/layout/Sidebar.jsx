import React from "react";
import { NotImplemented } from "../NotImplemented";

export const Sidebar = ({ onLogoutClick }) => {
  return (
    <aside className="menu">
      <ul className="menu-list">
        <li>
          <a className="is-active" href="/">
            Boards
          </a>
        </li>
        <li>
          <NotImplemented>
            <a href="/templates">Templates</a>
          </NotImplemented>
        </li>
        <li>
          <NotImplemented>
            <a href="/">Home</a>
          </NotImplemented>
        </li>
      </ul>
      <p className="menu-label">ACCOUNT</p>
      <ul className="menu-list">
        <li>
          <span onClick={onLogoutClick} className="logout-btn">
            Log out
          </span>
        </li>
      </ul>
      <p className="menu-label"></p>
    </aside>
  );
};
