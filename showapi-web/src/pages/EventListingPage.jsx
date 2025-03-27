import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';


const EventListingPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la recherche
  const [sortOrder, setSortOrder] = useState(null); // Initialement aucun tri par nom
  const [sortDateOrder, setSortDateOrder] = useState(null); // Initialement aucun tri par date

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/events');
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  // Filtrage dynamique des événements
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri des événements par nom si `sortOrder` est défini
  const sortedByName = [...filteredEvents].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name); // Tri croissant par nom
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name); // Tri décroissant par nom
    } else {
      return 0; // Pas de tri par nom si sortOrder est null
    }
  });

  // Tri des événements par date si `sortDateOrder` est défini
  const sortedByDate = [...sortedByName].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortDateOrder === "asc") {
      return dateA - dateB; // Tri croissant par date
    } else if (sortDateOrder === "desc") {
      return dateB - dateA; // Tri décroissant par date
    } else {
      return 0; // Pas de tri par date si sortDateOrder est null
    }
  });

  // Fonction pour alterner l'ordre de tri par nom
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : prevSortOrder === "desc" ? null : "asc"));
  };

  // Fonction pour alterner l'ordre de tri par date
  const toggleSortDateOrder = () => {
    setSortDateOrder((prevSortDateOrder) => (prevSortDateOrder === "asc" ? "desc" : prevSortDateOrder === "desc" ? null : "asc"));
  };

  // Fonction pour réinitialiser tous les tris
  const resetSorts = () => {
    setSortOrder(null); // Réinitialiser le tri par nom
    setSortDateOrder(null); // Réinitialiser le tri par date
  };

  return (
    <div>
      <h1>Liste des Evènements</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un évènement..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Bouton pour alterner le tri par nom */}
      <button onClick={toggleSortOrder}>
        Trier par nom ({sortOrder === "asc" ? "Alphabétique" : sortOrder === "desc" ? "Anti-alphabétique" : "Non trié"})
      </button>

      {/* Bouton pour alterner le tri par date */}
      <button onClick={toggleSortDateOrder}>
        Trier par date ({sortDateOrder === "asc" ? "Chronologique" : sortDateOrder === "desc" ? "Antéchronologique" : "Non trié"})
      </button>

      {/* Bouton pour réinitialiser les tris */}
      <button onClick={resetSorts}>
        Réinitialiser les tris
      </button>

      {/* Liste des événements triés par nom et date */}
      <EventList events={sortedByDate} />
    </div>
  );
};

export default EventListingPage;
