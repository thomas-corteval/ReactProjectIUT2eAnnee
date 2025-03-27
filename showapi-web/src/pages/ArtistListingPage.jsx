import React, { useState, useEffect } from 'react';
import ArtistList from '../components/ArtistList';


const ArtistListingPage = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la recherche
  const [sortOrder, setSortOrder] = useState("asc"); // État pour l'ordre de tri (croissant/déroulant)

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/artists');
      const data = await response.json();
      setArtists(data);
    };

    fetchArtists();
  }, []);

  // Filtrage dynamique des artistes
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour trier les artistes par nom
  const sortedArtists = filteredArtists.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Fonction pour alterner l'ordre de tri
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <h1>Liste des Artistes</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un artiste..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Bouton pour alterner le tri */}
      <button onClick={toggleSortOrder}>
        Trier par nom ({sortOrder === "asc" ? "Alphabétique" : "Anti-alphabétique"})
      </button>

      {/* Liste des artistes triés et filtrés */}
      <ArtistList artists={sortedArtists} />
    </div>
  );
};

export default ArtistListingPage;
