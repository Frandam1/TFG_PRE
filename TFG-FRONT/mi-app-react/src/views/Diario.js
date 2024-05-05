import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Diario.css';

const Diario = () => {
    const [diaries, setDiaries] = useState([]);
    const [error, setError] = useState('');
    const [diaryId, setDiaryId] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const diariesPerPage = 2; // Diarios por página

    // Estados para el formulario
    const [titulo, setTitulo] = useState('');
    const [agradecimiento, setAgradecimiento] = useState('');
    const [desafios, setDesafios] = useState('');
    const [fecha, setFecha] = useState('');

    // Función para obtener todos los diarios
    const fetchAllDiaries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/diario/findAll');
            setDiaries(response.data);
            setError(''); // Limpiar errores anteriores
        } catch (err) {
            setError('Error al obtener los diarios.');
            console.error(err);
        }
    };

    const saveDiary = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/diario/save', {
                titulo,
                agradecimiento,
                desafios,
                fecha
            });
            if (response.status === 201) {
                alert('Diario guardado con éxito');
                // Limpiar los campos
                setTitulo('');
                setAgradecimiento('');
                setDesafios('');
                setFecha('');
                fetchAllDiaries(); // Actualizar la lista de diarios
            }
        } catch (err) {
            setError('Error al guardar el diario');
            console.error(err);
        }
    };

    // Funciones para manejar la paginación
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular los diarios a mostrar en la página actual
    const indexOfLastDiary = currentPage * diariesPerPage;
    const indexOfFirstDiary = indexOfLastDiary - diariesPerPage;
    const currentDiaries = diaries.slice(indexOfFirstDiary, indexOfLastDiary);
    const totalPages = Math.ceil(diaries.length / diariesPerPage);

    return (
        <section className="section">
            <h1 className="diary-title">Gestión de Diarios</h1>
            <div className="diary-container">
                <div className="diary-column">
                    <form onSubmit={saveDiary}>
                        <h2 className="diary-subtitle">Nuevo Diario</h2>
                        <div className="diary-fields-container">
                            <div className="diary-field">
                                <label className="diary-label">Título</label>
                                <div className="diary-control">
                                    <input
                                        className="diary-input"
                                        type="text"
                                        value={titulo}
                                        onChange={e => setTitulo(e.target.value)}
                                        placeholder="Título del diario"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="diary-field">
                                <label className="diary-label">Fecha</label>
                                <div className="diary-control">
                                    <input
                                        className="diary-input"
                                        type="date"
                                        value={fecha}
                                        onChange={e => setFecha(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="diary-field">
                            <label className="diary-label">¿Como a ido el dia?</label>
                            <div className="diary-control">
                                <textarea
                                    className="diary-textarea-a"
                                    value={agradecimiento}
                                    onChange={e => setAgradecimiento(e.target.value)}
                                    placeholder="Aqui puedes poner tus vivencias y experiencias personales"
                                    required
                                />
                            </div>
                        </div>
                        <div className="diary-field">
                            <label className="diary-label">Retos y agradecimientos</label>
                            <div className="diary-control">
                                <textarea
                                    className="diary-textarea-b"
                                    value={desafios}
                                    onChange={e => setDesafios(e.target.value)}
                                    placeholder="Aqui puedes poner si has superado algún desafío inesperado,
                                    o si agradeces algún acto en particular"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="diary-button primary">Guardar Diario</button>
                        <button className="diary-button secondary" onClick={fetchAllDiaries}>
                            Mostrar Todos los Diarios
                        </button>
                    </form>
                </div>
                <div className="diary-column2">
                    <h1 className="diary-title">Mis diarios</h1>
                    {error && <p className="diary-help error">{error}</p>}
                    {currentDiaries.length > 0 ? currentDiaries.map((diary) => (
                        <div className="diary-box" key={diary.id}>
                            <h2 className="diary-subtitle">{diary.titulo}</h2>
                            <p><strong>Agradecimientos:</strong> {diary.agradecimiento}</p>
                            <p><strong>Desafíos:</strong> {diary.desafios}</p>
                            <p><strong>Fecha:</strong> {new Date(diary.fecha).toLocaleDateString()}</p>
                        </div>
                    )) : (
                        <p>Aqui se mostraran tus diarios pasados</p>
                    )}
                    {/* Paginación */}
                    <div className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </section>
    );
};

export default Diario;
