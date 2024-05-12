import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Cambiamos Line por Bar
import 'chart.js/auto';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Animo.css';

const Animo = () => {
  const [mood, setMood] = useState('');
  const [reason, setReason] = useState('');
  const [allMoods, setAllMoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ENTRIES_PER_PAGE = 2; // Ajuste de la paginación a 2

  useEffect(() => {
    fetchAllMoods();
  }, []);

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
    } catch (error) {
      console.error('Error al obtener los estados:', error);
      alert('Hubo un error al obtener los estados de ánimo. Inténtelo de nuevo.');
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
        backgroundColor: 'rgba(153, 102, 255, 0.6)', // Color violeta semi-transparente
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    };
};

const options = {
  scales: {
    y: 4000
  },
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false
    }
  },
  responsive: true,
  maintainAspectRatio: false
};

  const indexOfLastEntry = currentPage * ENTRIES_PER_PAGE;
  const indexOfFirstEntry = indexOfLastEntry - ENTRIES_PER_PAGE;
  const currentEntries = allMoods.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(allMoods.length / ENTRIES_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

    <div className="section">
      <h1 className='animo-h1'>Seccion ya esta bien</h1>
      <div className='animo-container'>
        <div className="chart-container">
          <Bar data={updateChart()} options={options} />
        </div>
        <div className='container-form'>
          <h1 className="text-center">Seguimiento del Estado de Ánimo</h1>
          <form className="formulario-animo" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="mood" className="form-label-mood">¿Cómo te sientes hoy?</label>
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
            <div className="form-label-reason">
              <label htmlFor="reason" className="label-reason">¿Por qué te sientes así?</label>
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

          <div id="previousEntries" className="mt-4">
       
            {currentEntries.map(entry => (
              <div key={entry.id} className="card-animo">
                <div className="card-body">
                  <p className="card-text">Fecha: {entry.date}, Estado de Ánimo: {entry.mood}, Motivo: {entry.reason}</p>
                  <button type="submit" className="btn-eliminar">Eliminar Estado</button>
                </div>
              </div>
            ))}
            {totalPages > 1 && (
              <nav>
                <ul className='pagination'>
                  {[...Array(totalPages).keys()].map(number => (
                    <li key={number + 1} className='page-item'>
                      <button onClick={() => paginate(number + 1)} className='page-link'>
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Animo;
