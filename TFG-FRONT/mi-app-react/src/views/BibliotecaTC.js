// BibliotecaTC.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BibliotecaTC = () => {
  const [technique, setTechnique] = useState('desviacion');
  const [techniqueInfo, setTechniqueInfo] = useState({});
  const [personalExample, setPersonalExample] = useState('');
  const [personalApplication, setPersonalApplication] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);

  const descriptions = {
    desviacion: {
      title: "Desviación de Pensamientos",
      description: "Involucra dirigir activamente tu mente lejos de pensamientos negativos o no productivos hacia pensamientos más positivos o útiles.",
      example: "Cuando empieces a preocuparte excesivamente sobre un evento futuro, intenta concentrarte en una tarea que requiera tu atención completa, como resolver un rompecabezas o practicar un hobby.",
      application: "Utiliza esta técnica cuando te encuentres rumiando o preocupándote por cosas que no puedes controlar."
    },
    pruebarealidad: {
      title: "Prueba de Realidad",
      description: "Te ayuda a cuestionar la veracidad de tus pensamientos negativos y a considerar si realmente tienen base en la realidad.",
      example: "Si te preocupa que todos te juzguen negativamente, podrías listar las evidencias reales que apoyan o contradicen este pensamiento.",
      application: "Aplica esta técnica cuando tus pensamientos te lleven a conclusiones extremas que te hacen sentir peor sobre ti mismo o tu situación."
    },
    busquedaalternativas: {
      title: "Búsqueda de Alternativas",
      description: "Consiste en buscar interpretaciones alternativas a los pensamientos negativos, lo que puede ayudarte a ver la situación desde una perspectiva más equilibrada y menos emocional.",
      example: "Si te sientes como un fracaso por no cumplir con una meta, intenta pensar en todas las veces que has tenido éxito.",
      application: "Úsala cuando te sientas abrumado por los fracasos, para recordarte tus éxitos y capacidades."
    }
  };

  useEffect(() => {
    setTechniqueInfo(descriptions[technique]);
    loadSavedEntries(technique);
  }, [technique]);

  const loadSavedEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/biblioteca/findAll');
      if (response.status === 200) {
        const entries = response.data.filter(entry => entry.tecnica === technique)
          .map(entry => ({
            id: entry.id,
            text: `Ejemplo: ${entry.ejemploPersonal}, Aplicación: ${entry.aplicacionPersonal}`,
            fecha: entry.fecha
          }));
        setSavedEntries(entries);
      } else {
        console.error('Error al obtener los datos desde el backend:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener los datos desde el backend:', error);
    }
  };

  const displayTechnique = (selectedTechnique) => {
    setTechnique(selectedTechnique);
    setTechniqueInfo(descriptions[selectedTechnique]);
    loadSavedEntries(selectedTechnique);
  };

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
          alert('Ejemplo guardado en el servidor!');
          setPersonalExample('');
          setPersonalApplication('');
          loadSavedEntries(technique); // Actualiza la lista de entradas desde el backend
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

  const editEntry = async (id) => {
    const entry = savedEntries.find(entry => entry.id === id);
    if (entry) {
      const newText = prompt("Edita tu ejemplo:", entry.text);
      if (newText !== null) {
        const [, ejemploPersonal, aplicacionPersonal] = newText.match(/Ejemplo: (.*), Aplicación: (.*)/) || [];

        if (ejemploPersonal && aplicacionPersonal) {
          const updatedEntry = {
            tecnica: technique,
            ejemploPersonal: ejemploPersonal.trim(),
            aplicacionPersonal: aplicacionPersonal.trim(),
            fecha: entry.fecha
          };

          try {
            const response = await axios.put(`http://localhost:8080/api/biblioteca/update/${id}`, updatedEntry);
            if (response.status === 200) {
              alert('Ejemplo actualizado en el servidor!');
              loadSavedEntries(); // Actualiza la lista de entradas desde el backend
            } else {
              alert('Error al actualizar el ejemplo en el servidor.');
            }
          } catch (error) {
            console.error('Error al actualizar el ejemplo:', error);
            alert('Error al actualizar el ejemplo en el servidor.');
          }
        } else {
          alert('La entrada editada no tiene el formato esperado. Asegúrate de incluir "Ejemplo:" y "Aplicación:" en el texto.');
        }
      }
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/biblioteca/delete/${id}`);
      if (response.status === 200) {
        alert('Ejemplo eliminado en el servidor!');
        loadSavedEntries(); // Actualiza la lista de entradas desde el backend
      } else {
        alert('Error al eliminar el ejemplo en el servidor.');
      }
    } catch (error) {
      console.error('Error al eliminar el ejemplo:', error);
      alert('Error al eliminar el ejemplo en el servidor.');
    }
  };

  return (
    <div className="container my-5 bg-light">
      <h1 className="text-center mb-4">Biblioteca de Técnicas Cognitivas</h1>
      <div className="list-group">
        <button className="list-group-item list-group-item-action" onClick={() => displayTechnique('desviacion')}>Desviación de Pensamientos</button>
        <button className="list-group-item list-group-item-action" onClick={() => displayTechnique('pruebarealidad')}>Prueba de Realidad</button>
        <button className="list-group-item list-group-item-action" onClick={() => displayTechnique('busquedaalternativas')}>Búsqueda de Alternativas</button>
      </div>
      {techniqueInfo.title && (
        <div id="content" className="mt-4">
          <h3>{techniqueInfo.title}</h3>
          <p>{techniqueInfo.description}</p>
          <p><strong>Ejemplo:</strong> {techniqueInfo.example}</p>
          <p><strong>Aplicación:</strong> {techniqueInfo.application}</p>
        </div>
      )}
      
      <h2 className="text-center my-4">Agregar un Ejemplo Personal</h2>
      <form id="personalExampleForm" className="mb-4" onSubmit={(e) => { e.preventDefault(); savePersonalExample(); }}>
        <div className="mb-3">
          <label htmlFor="techniqueSelect" className="form-label">Selecciona una Técnica</label>
          <select id="techniqueSelect" className="form-select" value={technique} onChange={(e) => setTechnique(e.target.value)}>
            <option value="desviacion">Desviación de Pensamientos</option>
            <option value="pruebarealidad">Prueba de Realidad</option>
            <option value="busquedaalternativas">Búsqueda de Alternativas</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="personalExample" className="form-label">Ejemplo Personal</label>
          <textarea className="form-control" id="personalExample" rows="3" placeholder="Ingrese su ejemplo personal" value={personalExample} onChange={(e) => setPersonalExample(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="personalApplication" className="form-label">Aplicación Personal</label>
          <textarea className="form-control" id="personalApplication" rows="3" placeholder="Ingrese su aplicación personal" value={personalApplication} onChange={(e) => setPersonalApplication(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Ejemplo</button>
      </form>

      <h2 className="text-center my-4">Tus Ejemplos Guardados</h2>
      <div id="savedEntries" className="mt-4">
        {savedEntries.length === 0 ? (
          <p>No hay ejemplos guardados.</p>
        ) : (
          savedEntries.map(entry => {
            const date = new Date(entry.id);
            const formattedDate = date.toLocaleDateString("es-ES", {
              year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            });
            return (
              <div className="card mb-2" key={entry.id}>
                <div className="card-body">
                  <h5>{descriptions[technique].title}</h5>
                  <p className="card-text">{entry.text}</p>
                  <button onClick={() => editEntry(entry.id)} className="btn btn-warning btn-sm">Editar</button>
                  <button onClick={() => deleteEntry(entry.id)} className="btn btn-danger btn-sm">Eliminar</button>
                  <span className="badge bg-primary">{formattedDate}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BibliotecaTC;
