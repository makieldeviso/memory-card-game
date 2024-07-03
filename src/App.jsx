import { useState, useRef, createContext } from 'react'

import GameArea from './components/GameArea';
import HeaderContent from './components/HeaderContent';
import FooterContent from './components/FooterContent';

function App() {

  return (
    <>
      <header>
        <HeaderContent/> 
      </header>
      
      <main>
        <GameArea/> 
      </main>

      <footer>
        <FooterContent/>
      </footer>
    </>
  )
}

export default App
