import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaBaby } from 'react-icons/fa'; // Importa íconos específicos que desees usar
import 'bulma/css/bulma.min.css'; // Asegúrate de que Bulma está importado
import Home from './views/Home';  // Importa Home
import TornilloView from './views/TornilloView'; // Asegúrate de importar el nuevo componente
import './App.css'; 
import Diary from './views/Diary';
import Diario from './views/Diario';


const App = () => {
  return (
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">Inicio</Link>
          <Link className="navbar-item" to="/diario">Diario</Link>
          <Link className="navbar-item" to="/tornillo">Tornillo</Link> {/* Nuevo enlace a la vista del tornillo */}
          <Link className="navbar-item" to="/diario2">Diario2</Link>

        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diario" element={<Diary />} />
        <Route path="/tornillo" element={<TornilloView />} />
        <Route path="/diario2" element={<Diario />} />
      </Routes>
    </Router>
  );
};

export default App;
