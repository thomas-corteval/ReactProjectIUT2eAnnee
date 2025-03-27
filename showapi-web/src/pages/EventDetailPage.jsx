import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`);
      const data = await response.json();
      setEvent(data);
    };

    fetchEventDetails();
  }, [id]);

  if (!event) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Artiste: <a href={`/artists/${event.artist.id}`}>{event.artist.name}</a></p>
      <h4>Participant:</h4>
      {event.participants && event.participants.length > 0 ? (
        <ul id='event'>
          {event.participants.map((participant) => (
            <li key={participant.id}>{participant.username}</li>
          ))}
        </ul>
      ) : (
        <p>No participants</p>
      )}
    </div>
  );
};

export default EventDetailPage;
