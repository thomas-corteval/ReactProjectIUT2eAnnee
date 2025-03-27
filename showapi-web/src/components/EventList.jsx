import React from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ events }) => {
  return (
    <div>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              <Link to={`/events/${event.id}`}>
                <h3>{event.name}</h3>
                <p>Date : {event.date}</p>
                <p>Artiste : {event.artist.name}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>Aucun évènement trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default EventList;
