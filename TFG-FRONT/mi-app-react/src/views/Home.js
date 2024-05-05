import React from 'react';
import Navbar from './Navbar';
import '../styles/Home.css'


const Home = () => {
  return (
    <section className="section">
      
      <div className="container-home">
        <div className='bienvenida-container'>
          <h1 className="title">Página de Inicio</h1>
          <p>Bienvenido a la página de inicio de nuestra app React con Bulma!</p>
        </div>
        <div className='login-container'>
          {/* METER EL FORM COMPONEnTE*/ }
          <h1 className="title">Página de Inicio</h1>
          <p>Bienvenido a la página de inicio de nuestra app React con Bulma!</p>
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default Home;
