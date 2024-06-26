import {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import Cards from '../components/Cards'
import ScoreBoard from './ScoreBoard';

import { generateRandomNumber, animateFlip, showLoadingScreen } from '../utilities/utilities';
import { getBatchData, getItemData } from '../utilities/getAPIData';

const GameArea = function () {

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // const [cardPick, setCardPick] = useState([]);

  const [cardBackData, setCardBackData] = useState([]);
  const [dataObjArr, setDataObjArr] = useState([]);

  const nextLevelRef = useRef(5);
  const cardPickRef = useRef([]);
  
  // Get resource for pokeballs
  useEffect(() => {
    const getBallData = async function () {
      const itemArray = [
        await getItemData('poke-ball'),
        await getItemData('great-ball'),
        await getItemData('ultra-ball'),
        await getItemData('master-ball')
      ]

      setCardBackData(itemArray);
    }
    getBallData();

     // Clean up code
     return () => {
      setCardBackData([]);
    }

  },[])

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

      showLoadingScreen(true);
      const dataBatch = await getBatchData(batchCount);
      showLoadingScreen(false);

      setDataObjArr((i) => i = dataBatch);   
    }
    getDataObjects();


    // Clean up code
    return () => {
      setDataObjArr([]);
    }

  },[level]);

  useEffect(() => {
    console.log(score)
    console.log(nextLevelRef)
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

  }, [score])


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

  const handleScoring = async function (event) {
    const cardNode = event.target;
    const cardId = event.target.dataset.id;

    // Add an Event that triggers after the animation
    const updateScore = function () {
      cardPickRef.current = [...cardPickRef.current, cardId];
      handleShuffleCards();
      setScore((s) => s + 1);
    }

    cardNode.addEventListener('transitionend', updateScore, {once: true});
    cardNode.addEventListener('webkitTransitionend', updateScore, {once: true});

    const cardCheck = cardPickRef.current.filter(card => card === cardId).length > 0;
    if (cardCheck) {
      // Note: if cardCheck is true, the card was already picked, game over
      setGameOver((g) => g = true);
      document.querySelector('dialog.game-over-screen').showModal();

    } else {
      // Note: if cardCheck is false, add score
      // Run animation to trigger transitionend event
      await animateFlip(false);  
    }

  }
  
  return (
    <div className='game-area'>
      {/* <p>{gameOver ? 'Game Over!' : 'Playing' }</p> */}
      <ScoreBoard level={level} score={score}/>
      <Cards 
        dataObjArr = {dataObjArr} 
        handleScoring = {handleScoring}
        cardBackData = {level < 4 ? cardBackData[level - 1] : cardBackData[3]}
        gameOver = {gameOver}
      />
    </div>
  )
}

GameArea.propTypes = {
  gameOverRef: PropTypes.shape({
    current: PropTypes.any
  })
}

export default GameArea