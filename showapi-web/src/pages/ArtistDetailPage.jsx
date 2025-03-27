import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ArtistDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'artiste depuis l'URL
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/artists/${id}`)
      .then((response) => response.json())
      .then((data) => setArtist(data))
      .catch((error) => console.error("Erreur de chargement :", error));
  }, [id]);

  if (!artist) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.description}</p>

      {/* Vérifier s'il y a des événements */}
      {artist.events && artist.events.length > 0 ? (
        <div>
          <h2>Événements :</h2>
          <ul>
            {artist.events.map((event) => (
              <li key={event.id}>
                <button onClick={() => navigate(`/events/${event.id}`)}>
                  {event.name} - {event.date}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucun événement pour cet artiste.</p>
      )}
    </div>
  );
};

export default ArtistDetailPage;
