import React, { useState } from 'react';
import Navbar from './Navbar';
import TabComponent from './TabComponent';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Biblio.css';

const Biblio = () => {
    const [technique, setTechnique] = useState('desviacion');
    const [personalExample, setPersonalExample] = useState('');
    const [personalApplication, setPersonalApplication] = useState('');
    const [viewMode, setViewMode] = useState('form');
    const [entries, setEntries] = useState([]);  // Este estado almacenará los datos de las entradas





    const savePersonalExample = async () => {
        if (personalExample && personalApplication && technique) {
          const newEntry = {
            tecnica: technique,
            ejemploPersonal: personalExample,
            aplicacionPersonal: personalApplication,
            fecha: new Date().toISOString()
          };
    
          try {
            const response = await axios.post('http://localhost:8080/api/biblioteca/save', newEntry);
            if (response.status === 201) {
              alert('Ejemplo guardado en persistencia!');
              setPersonalExample('');
              setPersonalApplication('');
            } else {
              alert('Error al guardar el ejemplo en el servidor.');
            }
          } catch (error) {
            console.error('Error al guardar el ejemplo:', error);
            alert('Error al guardar el ejemplo en el servidor.');
          }
        } else {
          alert('Por favor, complete todos los campos.');
        }
      };
    
      const loadSavedEntries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/biblioteca/findAll');
            if (response.status === 200) {
                setEntries(response.data);
                setViewMode('data');  // Cambia la vista para mostrar los datos
            } else {
                console.error('Error al obtener los datos desde el backend:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener los datos desde el backend:', error);
        }
    };

    const showForm = () => setViewMode('form');

    return (
        <div className="section">
          <h1 className="text-center mb-1">Biblioteca de Técnicas Cognitivas</h1>
          <div className='prov-form'>
          <div className='tab-comp'>
                  <TabComponent />
                </div>
            {viewMode === 'form' ? (
              <div> {/* Encapsula todo el contenido del modo formulario en un div */}

                <div className="form-biblio" onSubmit={(e) => { e.preventDefault(); savePersonalExample(); }}>
                  <select id="techniqueSelect" className="form-select mb-6" value={technique} onChange={(e) => setTechnique(e.target.value)}>
                    <option value="desviacion">Desviación de Pensamientos</option>
                    <option value="pruebarealidad">Prueba de Realidad</option>
                    <option value="busquedaalternativas">Búsqueda de Alternativas</option>
                  </select>
                  <div className="mb-6">
                    <label htmlFor="personalExample" className="form-label">Ejemplo Personal</label>
                    <textarea className="form-control" id="personalExample" rows="3" placeholder="Ingrese su ejemplo personal" value={personalExample} onChange={(e) => setPersonalExample(e.target.value)}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="personalApplication" className="form-label">Aplicación Personal</label>
                    <textarea className="form-control" id="personalApplication" rows="1" placeholder="Ingrese su aplicación personal" value={personalApplication} onChange={(e) => setPersonalApplication(e.target.value)}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={savePersonalExample}>Guardar Ejemplo</button>
                  <button type="button" className="btn btn-secondary" onClick={loadSavedEntries}>Ver Ejemplos Guardados</button>
                </div>
              </div>
            ) : (
              <div className="data-view"> {/* Encapsula todo el contenido del modo datos en un div */}
                {entries.map((entry, index) => (
                  <div key={index}>
                    <p><strong>Técnica:</strong> {entry.tecnica}</p>
                    <p><strong>Ejemplo:</strong> {entry.ejemploPersonal}</p>
                    <p><strong>Aplicación:</strong> {entry.aplicacionPersonal}</p>
                    <p><strong>Fecha:</strong> {new Date(entry.fecha).toLocaleDateString()}</p>
                    <hr />
                  </div>
                ))}
                <button onClick={showForm} className="btn btn-primary">Volver al Formulario</button>
              </div>
            )}
          </div>
          <Navbar />
        </div>
      );
      
};

export default Biblio;