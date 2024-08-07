import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Cards from '../components/Cards'
import ScoreBoard from './ScoreBoard';
import { GameOverScreen, LoadingScreen } from '../components/Modals';

import { generateRandomNumber, animateFlip } from '../utilities/utilities';
import { checkHighestScore, saveHighestScore } from '../utilities/localStorageHandler';
import { getBatchData } from '../utilities/getAPIData';

const GameArea = function () {

  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffle, setShuffle] = useState(0);
  const [level, setLevel] = useState(1);
  
  const [newHigh, setNewHigh] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(0);
  
  const [dataObjArr, setDataObjArr] = useState([]);

  const nextLevelRef = useRef(6);
  const cardPickRef = useRef([]);

  const loadingScreenRef = useRef(null);
  const gameOverScreenRef = useRef(null);
  
  const levelRef = useRef(1)
  // Get resource for pokemons
  useEffect(() => {
    loadingScreenRef.current.showModal();
    const getDataObjects = async function () {
      let batchCount;
      if (level === 1) {
        batchCount = 6;
      } else if (level === 2) {
        batchCount = 12;
      } else if (level >= 3) {
        batchCount = 18;
      } 

      //Note: empty card pick on level up
      cardPickRef.current = [];

      const dataBatch = await getBatchData(batchCount);
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

    if (score === nextLevelRef.current) {
      if (level === 1) {
        nextLevelRef.current = nextLevelRef.current + 12;

      } else if (level >= 2) {
        nextLevelRef.current = nextLevelRef.current + 18;
      } 
      setLevel(l => l + 1);
      levelRef.current++;
    }
  
  }, [score, level])  

  const handleStart = function () {
    setStart(true);
  }

  const handlePlayAgain = function () {
    setLevel(1);
    setScore(0);
    setNewHigh(false);
    setGameOver(false);
    setRestart(r => r + 1)

    nextLevelRef.current = 6;
    cardPickRef.current = [];
    levelRef.current = 1

    gameOverScreenRef.current.close();
  }

  useEffect(() => {
    animateFlip(false);
    
    if (start && levelRef.current === level) {

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

        setDataObjArr(shuffleCards())
      }
      
      const card = document.querySelector('div.card');
      card.addEventListener('animationend', handleShuffleCards, {once:true});
    }
    
  },[shuffle])
 
  const handleScoring = async function (event) {
    const cardId = event.target.dataset.id;
    
    const cardCheck = cardPickRef.current.filter(card => card === cardId).length > 0;
    if (cardCheck) {
      // Note: if cardCheck is true, the card was already picked, game over

      const checkHighScore = async function () {
        const newHigh = await checkHighestScore(score);
        if (newHigh) {
          saveHighestScore(score);
          setNewHigh(true);
        }
      }
      checkHighScore();

      setGameOver((g) => g = true);
      gameOverScreenRef.current.showModal();

    } else {
      // Note: if cardCheck is false, add score
      // Run animation to trigger transitionend event
      cardPickRef.current = [...cardPickRef.current, cardId];
      setScore(s => s + 1); 
      setShuffle(s => s + 1)
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

    <LoadingScreen loadingScreenRef={loadingScreenRef}/>
    <GameOverScreen newHigh={newHigh} score={score} gameOverScreenRef={gameOverScreenRef} handlePlayAgain={handlePlayAgain}/>
    </div>
  )
}

GameArea.propTypes = {
  gameOverRef: PropTypes.shape({
    current: PropTypes.any
  })
}

export default GameArea