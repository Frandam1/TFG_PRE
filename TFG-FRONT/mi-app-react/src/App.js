import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaBaby } from 'react-icons/fa'; // Importa íconos específicos que desees usar
import 'bulma/css/bulma.min.css'; // Asegúrate de que Bulma está importado
import Home from './views/Home';  // Importa Home
import TornilloView from './views/TornilloView'; // Asegúrate de importar el nuevo componente
import Diary from './views/Diary';
import Diario from './views/Diario';
import Animo from './views/Animo';
import BibliotecaTC from './views/BibliotecaTC';
import Minijuegos from './views/Minijuegos';
import Parejas from './views/Parejas';
import Ladrillos from './views/Ladrillos';
import Navbar from './views/Navbar';


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diario" element={<Diary />} />
        <Route path="/tornillo" element={<TornilloView />} />
        <Route path="/diario2" element={<Diario />} />
        <Route path="/estado-animo" element={<Animo />} />
        <Route path="/biblioteca" element={<BibliotecaTC />}/>
        <Route path="/minijuegos" element={<Minijuegos />}/>

        
        <Route path="/minijuegos/ladrillos" element={<Ladrillos />} />
        <Route path="/minijuegos/parejas" element={<Parejas />} /> 
      </Routes>
    </Router>
  );
};

export default App;
