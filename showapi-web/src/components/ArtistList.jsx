import React from 'react';
import { Link } from 'react-router-dom';

const ArtistList = ({ artists }) => {
  return (
    <div>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link to={`/artists/${artist.id}`}>
              <h3>{artist.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
