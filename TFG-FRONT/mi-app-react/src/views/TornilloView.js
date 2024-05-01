import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TornilloView = () => {
  const [tornillo, setTornillo] = useState(null);
  const [error, setError] = useState('');
  const [tornilloId, setTornilloId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [proveedorNombre, setProveedorNombre] = useState('');
  const [proveedorCiudad, setProveedorCiudad] = useState('');

    // Función fetch actualizada para usar el tornilloId
    useEffect(() => {
      const fetchTornillo = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/tornillo/find/${tornilloId}`);
          setTornillo(response.data); // Asumiendo que data es el objeto del tornillo
        } catch (err) {
          setError('Error al obtener datos');
          console.error(err);
        }
      };
  
      if (tornilloId) {
        fetchTornillo();
      }
    },
     [tornilloId]);  // Dependencia añadida aquí para re-ejecutar cuando tornilloId cambie

     const crearTornillo = async () => {
      try {
          const response = await axios.post('http://localhost:8080/api/tornillo/save', {
              nombre: nombre,
              price: precio,
              proveedor: {
                  id: proveedorId,
                  nombre: proveedorNombre,
                  ciudad: proveedorCiudad
              }
          });
          if (response.status === 201) {
              alert('Tornillo creado con éxito!');
              setTornillo(response.data);
          }
      } catch (err) {
          setError('Error al crear el tornillo');
          console.error(err);
      }
  };

  const actualizarTornillo = async () => {
    if (!tornilloId) {
        setError('Error: Debes especificar un ID de tornillo para actualizar');
        return;
    }
    try {
        const response = await axios.put(`http://localhost:8080/api/tornillo/update/${tornilloId}`, {

            nombre: nombre,
            price: precio,
            proveedor: {
                id: proveedorId,
                nombre: proveedorNombre,
                ciudad: proveedorCiudad
            }
        });
        if (response.status === 200) {
            alert('Tornillo actualizado con éxito!');
            setTornillo(response.data); // Suponiendo que el servidor retorna el objeto actualizado
        }
    } catch (err) {
        setError('Error al actualizar el tornillo');
        console.error(err);
    }
};

const eliminarTornillo = async () => {
  if (!tornilloId) {
      setError('Error: Debes especificar un ID de tornillo para eliminar');
      return;
  }
  try {
      const response = await axios.delete(`http://localhost:8080/api/tornillo/delete/${tornilloId}`);
      if (response.status === 200) {
          alert('Tornillo eliminado con éxito!');
          setTornillo(null); // Limpiar la vista después de eliminar
          setTornilloId(''); // Limpiar el campo del ID
          // También puedes limpiar otros campos si lo deseas
          setNombre('');
          setPrecio('');
          setProveedorId('');
          setProveedorNombre('');
          setProveedorCiudad('');
      }
  } catch (err) {
      setError('Error al eliminar el tornillo');
      console.error(err);
  }
};

  

return (
  <section className="section">
      <div className="container">
          <h1 className="title">Gestión de Tornillos</h1>
          {/* Sección para buscar y actualizar un tornillo existente */}
          <div className="field">
              <label className="label">Buscar Tornillo por ID</label>
              <div className="control">
                  <input
                      className="input"
                      type="number"
                      value={tornilloId}
                      onChange={e => setTornilloId(e.target.value)}
                      placeholder="Introduce el ID del tornillo para buscar"
                  />
              </div>
          </div>
          <div className="field">
              <label className="label">Nombre del Tornillo</label>
              <div className="control">
                  <input
                      className="input"
                      type="text"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Introduce el nombre del tornillo"
                  />
              </div>
          </div>
          <div className="field">
              <label className="label">Precio del Tornillo</label>
              <div className="control">
                  <input
                      className="input"
                      type="number"
                      value={precio}
                      onChange={e => setPrecio(e.target.value)}
                      placeholder="Introduce el precio del tornillo"
                  />
              </div>
          </div>
          <div className="field">
              <label className="label">ID del Proveedor</label>
              <div className="control">
                  <input
                      className="input"
                      type="number"
                      value={proveedorId}
                      onChange={e => setProveedorId(e.target.value)}
                      placeholder="Introduce el ID del proveedor"
                  />
              </div>
          </div>
          <div className="field">
              <label className="label">Nombre del Proveedor</label>
              <div className="control">
                  <input
                      className="input"
                      type="text"
                      value={proveedorNombre}
                      onChange={e => setProveedorNombre(e.target.value)}
                      placeholder="Introduce el nombre del proveedor"
                  />
              </div>
          </div>
          <div className="field">
              <label className="label">Ciudad del Proveedor</label>
              <div className="control">
                  <input
                      className="input"
                      type="text"
                      value={proveedorCiudad}
                      onChange={e => setProveedorCiudad(e.target.value)}
                      placeholder="Introduce la ciudad del proveedor"
                  />
              </div>
          </div>
          <div className="buttons">
              <button className="button is-primary" onClick={crearTornillo}>Crear Tornillo</button>
              <button className="button is-link" onClick={actualizarTornillo}>Actualizar Tornillo</button>
              <button className="button is-danger" onClick={eliminarTornillo}>Eliminar Tornillo</button>
          </div>
          {error && <p className="help is-danger">{error}</p>}
          {tornillo ? (
              <div className="box">
                  <p><strong>Nombre:</strong> {tornillo.nombre}</p>
                  <p><strong>Precio:</strong> {tornillo.price}</p>
                  <p><strong>Proveedor ID:</strong> {tornillo.proveedor?.id}</p>
                  <p><strong>Proveedor Nombre:</strong> {tornillo.proveedor?.nombre}</p>
                  <p><strong>Proveedor Ciudad:</strong> {tornillo.proveedor?.ciudad}</p>
              </div>
          ) : (
              <p>Cargando datos del tornillo...</p>
          )}
      </div>
  </section>
);


};

export default TornilloView;


