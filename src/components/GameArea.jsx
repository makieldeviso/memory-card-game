import {useState, useEffect} from 'react'

import Cards from '../components/Cards'

import { generateRandomNumber } from '../utilities/utilities';
import { getBatchData, getItemData } from '../utilities/getAPIData';

const GameArea = function () {

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cardBackData, setCardBackData] = useState([]);
  const [dataObjArr, setDataObjArr] = useState([]);
  const [cardPick, setCardPick] = useState([]);
  
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
      const dataBatch = await getBatchData(16);
      setDataObjArr((i) => i = dataBatch);   
    }
    getDataObjects();


    // Clean up code
    return () => {
      setDataObjArr([]);
    }

  },[level]);


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

  const handleScoring = function (event) {
    const cardId = event.target.dataset.id;
    
    const cardCheck = cardPick.filter(card => card === cardId).length > 0;
    
    if (cardCheck) {
      // Note: if cardCheck is true, the card was already picked, game over
      setGameOver((g) => g = true);

    } else {
       // Note: if cardCheck is false, add score
       setCardPick([...cardPick, cardId])
       handleShuffleCards()
       setScore((s) => s + 1);
    }

  }

  
  return (
    <div className='game-area'>
      <p>{gameOver ? 'Game Over!' : 'Playing' }</p>
      <p>{score}</p>
      <Cards 
        dataObjArr = {dataObjArr} 
        handleScoring = {handleScoring}
        cardBackData = {cardBackData[level - 1]}
      />
    </div>
  )
}

export default GameArea