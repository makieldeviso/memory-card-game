import pokeImg from '../assets/pokeball.png'

const GameOverScreen = function () {
  return (
    <dialog className='modal-screen game-over-screen'>
      <div className='modal-content'>
        <h2>Game Over</h2>
      </div>
    </dialog>
  )
}

const LoadingScreen = function () {
  return (
    <dialog className='modal-screen loading-screen'>
      <div className='modal-content'>
        <img src={pokeImg} alt="loading" className='loading-icon'/>
        <h2>Loading</h2>
      </div>
    </dialog>
  )
}


export {LoadingScreen, GameOverScreen}