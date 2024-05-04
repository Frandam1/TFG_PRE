import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Animo.css'
import axios from 'axios';


const Animo = () => {
  const [mood, setMood] = useState('');
  const [reason, setReason] = useState('');
  const [moodData, setMoodData] = useState([]);
  const [allMoods, setAllMoods] = useState([]);
  const [showAllMoods, setShowAllMoods] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ENTRIES_PER_PAGE = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);

    try {
      const response = await axios.post('http://localhost:8080/api/mood/save', {
        mood,
        reason,
        date: today
      });

      if (response.status === 201) {
        alert('Estado registrado con éxito');
        const newEntry = { mood, reason, date: today };
        setMoodData([...moodData, newEntry]);
        setAllMoods([...allMoods, newEntry]);
        setMood('');
        setReason('');
      }
    } catch (error) {
      console.error('Error al registrar el estado:', error);
      alert('Hubo un error al registrar el estado. Inténtelo de nuevo.');
    }
  };

  const fetchAllMoods = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mood/findAll');
      setAllMoods(response.data);
      setShowAllMoods(true);
    } catch (error) {
      console.error('Error al obtener los estados:', error);
      alert('Hubo un error al obtener los estados de ánimo. Inténtelo de nuevo.');
    }
  };

  const updateMood = async (id, mood) => {
    const updatedReason = prompt('Actualiza el motivo:', 'Nuevo motivo');
    const today = new Date().toISOString().slice(0, 10);

    if (updatedReason) {
      try {
        const response = await axios.put(`http://localhost:8080/api/mood/update/${id}`, {
          mood,
          reason: updatedReason,
          date: today
        });

        if (response.status === 200) {
          alert('Estado actualizado con éxito');
          setAllMoods(allMoods.map(entry => entry.id === id ? { ...entry, reason: updatedReason, date: today } : entry));
        }
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
        alert('Hubo un error al actualizar el estado de ánimo. Inténtelo de nuevo.');
      }
    }
  };

  const deleteMood = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/mood/delete/${id}`);
      if (response.status === 200) {
        alert('Estado eliminado con éxito');
        setAllMoods(allMoods.filter(entry => entry.id !== id));
        setCurrentPage(1); // Reiniciar la paginación al eliminar
      }
    } catch (error) {
      console.error('Error al eliminar el estado:', error);
      alert('Hubo un error al eliminar el estado de ánimo. Inténtelo de nuevo.');
    }
  };

  const updateChart = () => {
    const labels = allMoods.map(data => data.date);
    const moodLevels = {
      "Muy feliz": 5,
      "Feliz": 4,
      "Neutral": 3,
      "Triste": 2,
      "Muy triste": 1,
      "Ansioso": 2
    };
    const data = allMoods.map(data => ({
      x: data.date,
      y: moodLevels[data.mood]
    }));

    return {
      labels,
      datasets: [{
        label: 'Estado de Ánimo',
        data: data.map(item => item.y),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastEntry = currentPage * ENTRIES_PER_PAGE;
  const indexOfFirstEntry = indexOfLastEntry - ENTRIES_PER_PAGE;
  const currentEntries = allMoods.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(allMoods.length / ENTRIES_PER_PAGE);

  const toggleVisibility = () => {
    setShowAllMoods(!showAllMoods);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Seguimiento del Estado de Ánimo</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="mood" className="form-label">¿Cómo te sientes hoy?</label>
          <select id="mood" className="form-select" value={mood} onChange={e => setMood(e.target.value)}>
            <option value="">Selecciona un estado</option>
            <option value="Muy feliz">Muy feliz</option>
            <option value="Feliz">Feliz</option>
            <option value="Neutral">Neutral</option>
            <option value="Triste">Triste</option>
            <option value="Muy triste">Muy triste</option>
            <option value="Ansioso">Ansioso</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">¿Por qué te sientes así?</label>
          <textarea
            id="reason"
            className="form-control"
            placeholder="Describe el motivo de tu estado de ánimo."
            value={reason}
            onChange={e => setReason(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Registrar Estado</button>
      </form>

      <button className="btn btn-secondary mt-4" onClick={fetchAllMoods}>
        Mostrar Todos los Estados
      </button>

      {showAllMoods && (
        <>
          <div id="previousEntries" className="mt-4">
            <h3>Todos los Registros</h3>
            {currentEntries.map(entry => (
              <div key={entry.id} className="card mb-2">
                <div className="card-body">
                  <p className="card-text">Fecha: {entry.date}, Estado de Ánimo: {entry.mood}, Motivo: {entry.reason}</p>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => updateMood(entry.id, entry.mood)}>Actualizar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteMood(entry.id)}>Eliminar</button>
                </div>
              </div>
            ))}
            {/* Paginación */}
            <nav className="pagination is-centered mt-3">
              <ul className="pagination-list">
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="pagination-link" onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div id="moodChartContainer" className="mt-4">
            <Line data={updateChart()} />
          </div>
        </>
      )}
    </div>
  );
};

export default Animo;
