import {useState, useEffect, useRef} from 'react'

const ScoreBoard = function ({level, score}) {

  const [baseScore, setBaseScore] = useState(0);
  const [nextLevel, setNextLevel] = useState(5);

  useEffect(() => {
    if (level === 1) {
      setNextLevel(5);
    } else if (level === 2) {
      setNextLevel(10);
    } else if (level === 3) {
      setNextLevel(15);
    } else if (level >= 4) {
      setNextLevel(20);
    }

    setBaseScore(0);

  }, [level])

  useEffect(() => {

    if (score !== 0) {
      setBaseScore(s => s + 1);
    }
    
  },[score])


  return (
    <div className='score-board'>
      <p className='level-label'>{`Level ${level}`}</p>
      <p className='score-label'>{`Score ${score}`}</p>

      <div className="score-bar">
        <div
          className='meter'
          style = {{width: `${baseScore / nextLevel * 100}%`}}
        ></div>
      </div>

    </div>
  )
}

export default ScoreBoard