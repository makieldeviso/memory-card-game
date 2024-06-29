import { useState, useRef, createContext } from 'react'

import GameArea from './components/GameArea';
import HeaderContent from './components/HeaderContent';

function App() {

  return (
    <>
      <header>
        <HeaderContent/> 
      </header>
      
      <main>
        <GameArea/> 
      </main>
    </>
  )
}

export default App
