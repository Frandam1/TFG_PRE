import React, { useEffect, useState } from 'react';
import '../styles/Parejas.css';

const CARDS = [
  { id: 1, name: 'javascript', img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png' },
  { id: 2, name: 'css3', img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png' },
  { id: 3, name: 'html5', img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png' },
  { id: 4, name: 'safari', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735663/General%20assets/safari_mw13q8.png' },
  { id: 5, name: 'rails', img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png' },
  { id: 6, name: 'node', img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png' },
  { id: 7, name: 'react', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/react_m1pmwj.png' },
  { id: 8, name: 'angular', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/angular_qqblks.png' },
  { id: 9, name: 'vuejs', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/vue_ctikzd.png' },
  { id: 10, name: 'svelte', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/svelte_keupr5.png' },
  { id: 11, name: 'chrome', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735663/General%20assets/chrome_lr919s.png' },
  { id: 12, name: 'mozilla', img: 'https://res.cloudinary.com/henryzarza/image/upload/v1601735663/General%20assets/mozilla_us5y7o.png' }
];

const shuffleArray = (array) => {
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    [array[counter], array[index]] = [array[index], array[counter]];
  }
  return array;
};

const Parejas = () => {
  const [cards, setCards] = useState([]);
  const [pickedCardIndex, setPickedCardIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [counter, setCounter] = useState(CARDS.length + 20);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledCards = shuffleArray([...CARDS, ...CARDS]).map((card) => ({ ...card, isPicked: false, isGuessed: false }));
    setCards(shuffledCards);
    setPickedCardIndex(null);
    setIsPaused(false);
    setIsLose(false);
    setCounter(CARDS.length + 20);
    setShowModal(false);
  };

  const handleClick = (index) => {
    if (isPaused || isLose || !cards[index] || cards[index].isGuessed || cards[index].isPicked) return;

    const newCards = [...cards];
    newCards[index].isPicked = true;
    setCards(newCards);

    if (pickedCardIndex !== null && cards[pickedCardIndex]) {
      setIsPaused(true);
      if (newCards[pickedCardIndex].id === newCards[index].id) {
        newCards[pickedCardIndex].isGuessed = true;
        newCards[index].isGuessed = true;
        setCards(newCards);
        setPickedCardIndex(null);
        setIsPaused(false);
      } else {
        setTimeout(() => {
          newCards[pickedCardIndex].isPicked = false;
          newCards[index].isPicked = false;
          setCards(newCards);
          setPickedCardIndex(null);
          setIsPaused(false);
        }, 1500);
      }
    } else {
      setPickedCardIndex(index);
    }

    const remainingMoves = counter - 1;
    setCounter(remainingMoves);
    if (remainingMoves === 0) lose();
    if (newCards.every((card) => card.isGuessed)) win();
  };

  const win = () => {
    setIsPaused(true);
    setModalMessage('¡Has ganado! 🙌🥳');
    setShowModal(true);
  };

  const lose = () => {
    setIsLose(true);
    setModalMessage('Has perdido 😢😩');
    setShowModal(true);
  };

  return (
    <div className='parejas'>
    <main className="content-parejas">
      <header className="header-parejas">
        <h1 className="title-parejas">Memory Game</h1>
        <div className="movement-parejas">
          <h6 className="subtitle-parejas">Movements</h6>
          <div className="available-parejas">{counter}</div>
        </div>
      </header>
      <div className="card-container-parejas">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card-parejas ${card.isPicked ? 'card--picked-parejas' : ''} ${
              card.isGuessed ? 'card--guessed-parejas' : ''
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="card__front-parejas">
              <img className="front__img" src={card.img} alt={card.name} />
              <h6 className="card__name-parejas">{card.name}</h6>
            </div>
            <div className="card__back-parejas">
              <img
                className="back__img-parejas"
                src="https://res.cloudinary.com/henryzarza/image/upload/v1601745355/General%20assets/thought_pr1pzv.png"
                alt="Thought"
              />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-parejas modal--open">
          <div className="modal-container-parejas">
            <h3 className="modal-title-parejas">{modalMessage}</h3>
            <button type="button" className="button-parejas" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
    </div>
  );
};

export default Parejas;
