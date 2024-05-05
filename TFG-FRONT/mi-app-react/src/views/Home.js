import React from 'react';
import Navbar from './Navbar';
import '../styles/Home.css'
import Login from './LoginForm';
import { motion } from 'framer-motion';



const Home = () => {

  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="section">
      <div className="container-home">
        <motion.div
          className='bienvenida-container'
          initial="hidden"
          animate="visible"
          variants={leftVariant}
          transition={{ duration: 0.9 }}
        >
          <h1 className="title-home">Bienvenido a la noseque</h1>
          <p className='p-home'>Bienvenido a la <span>página</span> de inicio de nuestra app Rea</p>
          <p>LoreIpsum LoreIpsum LoreIpsum LoreIpsum LoreIpsum LoreIpsum LoreIpsumLoreIpsum</p>
        </motion.div>

        <motion.div
          className='login-container'
          initial="hidden"
          animate="visible"
          variants={rightVariant}
          transition={{ duration: 0.9 }}
        >
          <Login />
        </motion.div>
      </div>
      <Navbar />
    </section>
  );
};

export default Home;
