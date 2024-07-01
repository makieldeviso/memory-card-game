import pokeImg from '../assets/pokeball.png'

import { RestartIcon, GameOverIcon } from './Icons'

const GameOverScreen = function ({score, gameOverScreenRef, handlePlayAgain}) {
  return (
    <dialog className='modal-screen game-over-screen' ref={ gameOverScreenRef }>
      <div className='modal-content'>
        <h2>Game Over</h2>
        <p className='game-over-score'>{`Score: ${score}`}</p>
        <GameOverIcon/>
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


export {LoadingScreen, GameOverScreen}