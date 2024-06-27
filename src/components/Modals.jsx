import pokeImg from '../assets/pokeball.png'

const GameOverScreen = function ({gameOverScreenRef, handlePlayAgain}) {
  return (
    <dialog className='modal-screen game-over-screen' ref={gameOverScreenRef}>
      <div className='modal-content'>
        <h2>Game Over</h2>
        <button 
          type='button'
          onClick={handlePlayAgain}
        >
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