import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { checkHighestScore, getHighestScore } from '../utilities/localStorageHandler';

const ScoreBoard = function ({level, score, restart}) {

  const [baseScore, setBaseScore] = useState(0);
  const [nextLevel, setNextLevel] = useState(6);

  const [highScore, setHighScore] = useState(0);

  const [sessionHigh, setSessionHigh] = useState(false);
  
  // Set base score for the meter
  useEffect(() => {
    if (level === 1) {
      setNextLevel(6);
    } else if (level === 2) {
      setNextLevel(12);
    } else if (level >= 3) {
      setNextLevel(18);
    }

    setBaseScore(0);

  }, [level, restart])

  // Changes meter width every score
  useEffect(() => {
    if (score !== 0) {
      setBaseScore(s => s + 1);
    }
    
  },[score])

  useEffect(() => {

    const getHighScore = async function () {
      const highScore = await getHighestScore();
      setHighScore(highScore.previousHigh)
    }

    getHighScore();
    
  }, [restart])

  useEffect(() => {

    const checkHighScore = async function () {
      const newHigh = await checkHighestScore(score);
      if (newHigh) {
        setSessionHigh(true);
      } else {
        setSessionHigh(false);
      }
    }
    checkHighScore();

    return () => {
      setSessionHigh(false);
    }

  },[score, restart])
   
  return (
    <div className='score-board'>
      <div className={`main-score-board ${sessionHigh ? 'new-high' : ''}`}>
        <p className = 'score-label'>Score</p>
        <p className='score-count'>{score}</p>
      </div>
    
      <div className='score-bar-cont'>
      <p className = 'highest-score-label'>{`High Score: ${highScore}`}</p>
      <p className = 'level-label'>{`Lv${level}`}</p>
        <div className="score-bar">
          <div
            className='meter'
            style = {{width: `${baseScore / nextLevel * 100}%`}}
          ></div>
        </div>
      </div>

    </div>
  )
}

ScoreBoard.propTypes = {
  level: PropTypes.number,
  score: PropTypes.number,
  restart: PropTypes.number
}

export default ScoreBoard