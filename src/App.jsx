import { useState, useRef, createContext } from 'react'

import GameArea from './components/GameArea'
import { GameOverScreen, LoadingScreen } from './components/Modals';

function App() {

  return (
    <>
      <header>
        <h1>Memory Card</h1>
        
      </header>
      <main>
        <GameArea/> 
        <GameOverScreen/>
        <LoadingScreen/>
      </main>
    </>
  )
}

export default App
