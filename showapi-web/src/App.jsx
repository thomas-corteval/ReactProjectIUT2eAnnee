import React from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Correction ici
import ArtistListingPage from './pages/ArtistListingPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import EventListingPage from './pages/EventListingPage';
import EventDetailPage from './pages/EventDetailPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<ArtistListingPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />
        <Route path="/events" element={<EventListingPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
