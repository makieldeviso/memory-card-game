import PropTypes from 'prop-types';

import pokeImg from '../assets/pokeball.png';
import { RestartIcon, GameOverIcon } from './Icons';

const GameOverScreen = function ({ newHigh, score, handlePlayAgain, gameOverScreenRef }) {
 
  return (
    <dialog
      className={`modal-screen game-over-screen ${newHigh ? 'new-high': ''}`} 
      ref={ gameOverScreenRef }
    >
      <div className='modal-content'>
        <h2>Game Over</h2>
        {newHigh && <h3>New High Score!</h3>}
        <p className='game-over-score'>{`Score: ${score}`}</p>
        <GameOverIcon newHigh={newHigh}/>
        <button 
          type='button'
          className='play-again-btn'
          onClick={handlePlayAgain}
        >
          <RestartIcon/>
            Play Again
        </button>
      </div>
    </dialog>
  )
}

GameOverScreen.propTypes = {
  newHigh: PropTypes.bool,
  score: PropTypes.number,
  handlePlayAgain: PropTypes.func,
  gameOverScreenRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
}

const LoadingScreen = function ({loadingScreenRef}) {
  return (
    <dialog className='modal-screen loading-screen' ref={loadingScreenRef}>
      <div className='modal-content'>
        <img src={pokeImg} alt="loading" className='loading-icon'/>
        <h2>Loading</h2>
      </div>
    </dialog>
  )
}

LoadingScreen.propTypes = {
  loadingScreenRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
}

export {LoadingScreen, GameOverScreen}