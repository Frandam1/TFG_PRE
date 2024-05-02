import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Animo.css'

const Animo = () => {
  const [mood, setMood] = useState('');
  const [reason, setReason] = useState('');
  const [moodData, setMoodData] = useState([]);
  const ENTRIES_PER_PAGE = 3;

  useEffect(() => {
    const storedMoodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    setMoodData(storedMoodData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const newEntry = { date: today, mood, reason, id: Date.now() };
    const updatedMoodData = [...moodData, newEntry];
    setMoodData(updatedMoodData);
    localStorage.setItem('moodData', JSON.stringify(updatedMoodData));
    setMood('');
    setReason('');
  };

  const editEntry = (entryId) => {
    const entry = moodData.find(entry => entry.id === entryId);
    if (entry) {
      const newMood = prompt("Edita tu estado de ánimo:", entry.mood);
      const newReason = prompt("Edita el motivo:", entry.reason);
      if (newMood && newReason) {
        const updatedMoodData = moodData.map(item =>
          item.id === entryId ? { ...item, mood: newMood, reason: newReason } : item
        );
        setMoodData(updatedMoodData);
        localStorage.setItem('moodData', JSON.stringify(updatedMoodData));
      }
    }
  };

  const loadPreviousEntries = () => {
    return moodData.slice(-ENTRIES_PER_PAGE).map(entry => (
      <div key={entry.id} className="card mb-2">
        <div className="card-body">
          <p className="card-text">Fecha: {entry.date}, Estado de Ánimo: {entry.mood}, Motivo: {entry.reason}</p>
          <button onClick={() => editEntry(entry.id)} className="btn btn-warning btn-sm">Editar</button>
        </div>
      </div>
    ));
  };

  const moodLevels = {
    "Muy feliz": 5,
    "Feliz": 4,
    "Neutral": 3,
    "Triste": 2,
    "Muy triste": 1,
    "Ansioso": 2
  };

  const updateChart = () => {
    const labels = moodData.map(data => data.date);
    const data = moodData.map(data => ({
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

      <div id="latestEntry" className="mt-4">
        {moodData.length > 0 && (
          <>
            <h3>Último Registro</h3>
            <p>Fecha: {moodData[moodData.length - 1].date}</p>
            <p>Estado de Ánimo: {moodData[moodData.length - 1].mood}</p>
            <p>Motivo: {moodData[moodData.length - 1].reason}</p>
          </>
        )}
      </div>
      <div id="moodChartContainer">
        <Line data={updateChart()} />
      </div>
      <div id="previousEntries" className="mt-4">
        {loadPreviousEntries()}
      </div>
    </div>
  );
};

export default Animo;
