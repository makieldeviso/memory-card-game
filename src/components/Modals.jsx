import { useRef } from 'react';
import PropTypes from 'prop-types';

import pokeImg from '../assets/pokeball.png';
import infoGif from '../assets/info.gif';

import { RestartIcon, GameOverIcon, InfoIcon, Close } from './Icons';

const InfoButtonPlusModal = function () {
  const infoScreenRef = useRef(null);

  // Modal opener button
  const InfoButton = function () {
    return (
      <button
        type = 'button' 
        className = 'info-btn' 
        aria-label = 'Open game info'
        onClick = {() => infoScreenRef.current.showModal()}
      >
        <InfoIcon/>
      </button>
    )
  }
  
  // Info Screen Modal
  const InfoScreen = function () {
    return (
      <dialog className='modal-screen info-screen' ref={infoScreenRef}>
        <button 
          className = 'close-btn'
          onClick = {() => infoScreenRef.current.close()}
        >
          <Close/>
        </button>

        <div className='modal-content'>
          <h2>How to play</h2>
          <ol>
            <li>Pick a unique card in every turn.</li>
            <li>After pick, card placement is shuffled for the next turn.</li>
            <li>You must not repeat a card pick in a level.</li>
            <li>A successful pick scores a point.</li>
            <li>If a card was already picked within a level, the game is over.</li>
            <li>Your card picks are refreshed in every level, so instance of picking the same card in a different level is a successful pick.</li>
            <li>The first few levels are stacked with fewer cards. Leveling up adds more cards to the stack.</li>
            <li>Keep on picking unique cards and accumulate points to attain the high score.</li>
          </ol>

          <img src={infoGif} alt="" className='info-gif'/>

        </div>

      </dialog>
    )
  }

  return (
    <div className='menu-option'>
      <InfoButton/>
      <InfoScreen/>
    </div>
  )
}

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
        <p>Loading</p>
      </div>
    </dialog>
  )
}

LoadingScreen.propTypes = {
  loadingScreenRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
}

export {LoadingScreen, GameOverScreen, InfoButtonPlusModal}