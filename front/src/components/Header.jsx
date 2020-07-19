import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link to="/home" className="navbar-brand">
        HOME
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to="/goals" className="nav-link" activeClassName="active">
            Goals
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/new-goal" className="nav-link" activeClassName="active">
            Add Goal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/steps" className="nav-link" activeClassName="active">
            Steps
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header;