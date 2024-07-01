import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Cards from '../components/Cards'
import ScoreBoard from './ScoreBoard';
import { GameOverScreen, LoadingScreen } from '../components/Modals';

import { generateRandomNumber, animateFlip } from '../utilities/utilities';
import { getBatchData } from '../utilities/getAPIData';

const GameArea = function () {

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(0);

  const [dataObjArr, setDataObjArr] = useState([]);

  const nextLevelRef = useRef(5);
  const cardPickRef = useRef([]);

  const loadingScreenRef = useRef(null);
  const gameOverScreenRef = useRef(null);
  
  // Get resource for pokemons
  useEffect(() => {
    const getDataObjects = async function () {
      let batchCount;
      if (level === 1) {
        batchCount = 5;
      } else if (level === 2) {
        batchCount = 10;
      } else if (level === 3) {
        batchCount = 15;
      } else if (level >= 4) {
        batchCount = 20;
      }

      //Note: empty card pick on level up
      cardPickRef.current = [];

      loadingScreenRef.current.showModal();
      const dataBatch = await getBatchData(batchCount);
      console.log(dataBatch)
      loadingScreenRef.current.close();

      setDataObjArr((d) => d = dataBatch);  
    }
    getDataObjects()

    // Clean up code
    return () => {
      setDataObjArr(d => d = []);
    }

  },[level, restart]);

  // Checks score and update level
  useEffect(() => {

    if (level === 1 && score === nextLevelRef.current) {
      nextLevelRef.current = nextLevelRef.current + 10;
      setLevel(l => l + 1);
      
    } else if (level === 2 && score === nextLevelRef.current) {
      nextLevelRef.current = nextLevelRef.current + 15;
      setLevel(l => l + 1);

    } else if (level === 3 && score === nextLevelRef.current) {
      nextLevelRef.current = nextLevelRef.current + 20;
      setLevel(l => l + 1);

    } else if (level >= 4 && score === nextLevelRef.current) {
      nextLevelRef.current = nextLevelRef.current + 20
      setLevel(l => l + 1);
    }

  }, [score, level])  

  const handleStart = function () {
    setStart(true);
  }

  const handlePlayAgain = function () {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setRestart(r => r + 1)

    nextLevelRef.current = 5;
    cardPickRef.current = [];

    gameOverScreenRef.current.close();
  }

  const handleShuffleCards = function () {
    const shuffleCards = function (current = [...dataObjArr], shuffled = []) {
      if (current.length > 0) {
        const randomIndex = generateRandomNumber(0, current.length - 1);
        const getCard = current.splice(randomIndex, 1);
        return shuffleCards([...current], [...shuffled, getCard[0]]);

      } else {
        return shuffled        
      }
    }
    setDataObjArr(shuffleCards());  
  }

  // const [flip, setFlip] = useState(false);
  // useEffect(() => {
  //   if (flip) {
  //     console.log('ofp')
  //     // Add an Event that triggers after the animation
  //     animateFlip(false);
      
  //     setTimeout(() => {
  //       handleShuffleCards();
  //       setFlip(false)
  //       // animateFlip(true);
  //     }, 600);
  //   }

  // },[flip]);

  
  const handleScoring = async function (event) {
    const cardId = event.target.dataset.id;
    
    const cardCheck = cardPickRef.current.filter(card => card === cardId).length > 0;
    if (cardCheck) {
      // Note: if cardCheck is true, the card was already picked, game over
      setGameOver((g) => g = true);
      gameOverScreenRef.current.showModal();

    } else {
      // Note: if cardCheck is false, add score
      // Run animation to trigger transitionend event
      cardPickRef.current = [...cardPickRef.current, cardId];
      setScore(s => s + 1); 
      // setFlip(true);
    }
  }
  
  return (
    <div className='game-area'>
      <ScoreBoard level={level} score={score} restart={restart}/>
      <Cards 
        dataObjArr = {dataObjArr} 
        start = {start}
        gameOver = {gameOver}
        score = {score}
        level = {level}
        handleScoring = {handleScoring}
        handleStart = {handleStart}
      />

    <GameOverScreen score={score} gameOverScreenRef={gameOverScreenRef} handlePlayAgain={handlePlayAgain}/>
    <LoadingScreen loadingScreenRef={loadingScreenRef}/>
    </div>
  )
}

GameArea.propTypes = {
  gameOverRef: PropTypes.shape({
    current: PropTypes.any
  })
}

export default GameArea