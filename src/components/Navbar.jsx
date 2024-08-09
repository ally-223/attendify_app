import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auth">Authentication</Link>
        </li>
        <li>
          <Link to="/setstatus">Set Status</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
