import React, { useState } from 'react';
import axios from 'axios';

const Diario = () => {
    const [diary, setDiary] = useState(null);
    const [error, setError] = useState('');
    const [diaryId, setDiaryId] = useState('');

    // Estados para el formulario
    const [titulo, setTitulo] = useState('');
    const [agradecimiento, setAgradecimiento] = useState('');
    const [desafios, setDesafios] = useState('');
    const [fecha, setFecha] = useState('');

    const fetchDiaryById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diario/find/${diaryId}`);
            setDiary(response.data);
            setTitulo(response.data.titulo);
            setAgradecimiento(response.data.agradecimiento);
            setDesafios(response.data.desafios);
            setFecha(response.data.fecha);
            setError(''); // Limpiar errores anteriores
        } catch (err) {
            setError('No se encontró el diario.');
            setDiary(null); // Limpiar datos previos
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
            }
        } catch (err) {
            setError('Error al guardar el diario');
            console.error(err);
        }
    };

    const updateDiary = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/diario/update/${diaryId}`, {
                titulo,
                agradecimiento,
                desafios,
                fecha
            });
            if (response.status === 200) {
                alert('Diario actualizado con éxito');
            }
        } catch (err) {
            setError('Error al actualizar el diario');
            console.error(err);
        }
    };

    const deleteDiary = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/diario/delete/${diaryId}`);
            if (response.status === 200) {
                alert('Diario eliminado con éxito');
                setDiary(null); // Limpiar datos del diario
                setDiaryId(''); // Limpiar el ID del diario
            }
        } catch (err) {
            setError('Error al eliminar el diario');
            console.error(err);
        }
    };
    

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Gestión de Diarios</h1>
                <div className="columns">
                    {/* Columna para el formulario */}
                    <div className="column is-half">
                        <form onSubmit={saveDiary}>
                            <h2 className="title is-4">Nuevo Diario</h2>
                            <div className="field">
                                <label className="label">Título</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={titulo}
                                        onChange={e => setTitulo(e.target.value)}
                                        placeholder="Título del diario"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Agradecimiento</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={agradecimiento}
                                        onChange={e => setAgradecimiento(e.target.value)}
                                        placeholder="Motivos de gratitud"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Desafíos</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={desafios}
                                        onChange={e => setDesafios(e.target.value)}
                                        placeholder="Desafíos enfrentados"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Fecha</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="date"
                                        value={fecha}
                                        onChange={e => setFecha(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="button is-primary">Guardar Diario</button>
                        </form>
                    </div>

                    {/* Columna para la búsqueda y actualizar el diario */}
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Buscar Diario por ID</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={diaryId}
                                    onChange={e => setDiaryId(e.target.value)}
                                    placeholder="Introduce el ID del diario"
                                />
                            </div>
                            <button className="button is-link mt-2" onClick={fetchDiaryById}>
                                Buscar
                            </button>

                        </div>
                        {error && <p className="help is-danger">{error}</p>}
                        {diary && (
                            <div className="box mt-4">
                                <h2 className="title is-4">{diary.titulo}</h2>
                                <p><strong>Agradecimiento:</strong> {diary.agradecimiento}</p>
                                <p><strong>Desafíos:</strong> {diary.desafios}</p>
                                <p><strong>Fecha:</strong> {new Date(diary.fecha).toLocaleDateString()}</p>
                                <button className="button is-warning mt-3" onClick={updateDiary}>
                                    Actualizar Diario
                                </button>
                                <button className="button is-danger mt-3 ml-1" onClick={deleteDiary}>
                                Eliminar Diario
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Diario;
