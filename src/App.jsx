import { useState } from 'react'

import GameArea from './components/GameArea'

function App() {

  return (
    <>
      <header>
        <h1>Memory Card</h1>
        
      </header>
      <main>
        <div className='game-area'>
          <GameArea/>  
        </div>
      </main>
    </>
  )
}

export default App
