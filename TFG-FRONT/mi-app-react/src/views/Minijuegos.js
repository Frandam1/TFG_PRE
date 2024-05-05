import React from 'react';
import { useNavigate } from 'react-router-dom';
import juego1Img from '../assets/juego1.jpg';
import juego2Img from '../assets/juego2.jpg';
import '../styles/Minijuegos.css'
import Navbar from './Navbar';

const Minijuegos = () => {
  const navigate = useNavigate();

  const juegos = [
    {
      id: 'ladrillos',
      title: 'Minijuego 1',
      description: 'Descripción breve del Minijuego 1.',
      image: juego1Img,
    },
    {
      id: 'parejas',
      title: 'Minijuego 2',
      description: 'Descripción breve del Minijuego .',
      image: juego2Img, // Asegúrate de que esta imagen esté en la carpeta assets
    },
  ];

  const navigateToGame = (gameId) => {
    navigate(`/minijuegos/${gameId}`);
  };

  return (
    <div className="container-mini">
      <Navbar />
      {juegos.map((juego) => (
        <div
          key={juego.id}
          className="card"
          onClick={() => navigateToGame(juego.id)}
        >
          <img src={juego.image} alt={juego.title} className="image" />
          <h2 className="title">{juego.title}</h2>
          <p className="description">{juego.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Minijuegos;
