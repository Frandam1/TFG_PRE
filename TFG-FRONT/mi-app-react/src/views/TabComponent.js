import React, { useState } from 'react';
import '../styles/componentsCss/TabComponent.css';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const tabContent = {
    tab1: {
      title: "Desviación de Pensamientos",
      description: "Involucra dirigir activamente tu mente lejos de pensamientos negativos o no productivos hacia pensamientos más positivos o útiles.",
      example: "Cuando empieces a preocuparte excesivamente sobre un evento futuro, intenta concentrarte en una tarea que requiera tu atención completa, como resolver un rompecabezas o practicar un hobby.",
      application: "Utiliza esta técnica cuando te encuentres rumiando o preocupándote por cosas que no puedes controlar."
    },
    tab2: {
      title: "Prueba de Realidad",
      description: "Te ayuda a cuestionar la veracidad de tus pensamientos negativos y a considerar si realmente tienen base en la realidad.",
      example: "Si te preocupa que todos te juzguen negativamente, podrías listar las evidencias reales que apoyan o contradicen este pensamiento.",
      application: "Aplica esta técnica cuando tus pensamientos te lleven a conclusiones extremas que te hacen sentir peor sobre ti mismo o tu situación."
    },
    tab3: {
      title: "Búsqueda de Alternativas",
      description: "Consiste en buscar interpretaciones alternativas a los pensamientos negativos, lo que puede ayudarte a ver la situación desde una perspectiva más equilibrada y menos emocional.",
      example: "Si te sientes como un fracaso por no cumplir con una meta, intenta pensar en todas las veces que has tenido éxito.",
      application: "Úsala cuando te sientas abrumado por los fracasos, para recordarte tus éxitos y capacidades."
    },
    tab4: {
        title: "Búsqueda de Alternativas",
        description: "Consiste en buscar interpretaciones alternativas a los pensamientos negativos, lo que puede ayudarte a ver la situación desde una perspectiva más equilibrada y menos emocional.",
        example: "Si te sientes como un fracaso por no cumplir con una meta, intenta pensar en todas las veces que has tenido éxito.",
        application: "Úsala cuando te sientas abrumado por los fracasos, para recordarte tus éxitos y capacidades."
      }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="section">
      <div className="tabs-container">
        <div className="tabs-layout">
          <select className="tabs-select" onChange={e => handleTabChange(e.target.value)} value={activeTab}>
            <option value="tab1">Desviación de Pensamientos</option>
            <option value="tab2">Prueba de Realidad</option>
            <option value="tab3">Búsqueda de Alternativas</option>
          </select>
          <ul className="tabs">
            {Object.keys(tabContent).map((tab, index) => (
              <li key={index}>
                <button
                  id={tab}
                  title={tabContent[tab].title}
                  onClick={() => handleTabChange(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tabContent[tab].title}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content-wrapper">
            <section className="tab-content">
              <h2>{tabContent[activeTab].title}</h2>
              <p>{tabContent[activeTab].description}</p>
              <p><strong>Ejemplo:</strong> {tabContent[activeTab].example}</p>
              <p><strong>Aplicación:</strong> {tabContent[activeTab].application}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
