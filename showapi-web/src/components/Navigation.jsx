import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Liste des Artistes</Link>
        </li>
        <li>
          <Link to="/events">Liste des Evénements</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
