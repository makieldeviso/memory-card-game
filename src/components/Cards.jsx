import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { animateFlip, capitalizeString } from "../utilities/utilities";

import { BallIcons } from "./Icons";

const Cards = function ({dataObjArr, start, gameOver, score, level, handleStart, handleScoring}) {

  useEffect(() => {
    if (start) {
      animateFlip(true);
    }
    
    return () => {
      if (start) {
        animateFlip(false);
      }
    }

  }, [start, gameOver, score, dataObjArr])

  const ImageCards = function () {
    const CardsArray = dataObjArr.map(data => {
      return (
        <div 
          key = {data.id} 
          className = {`card ${gameOver ? 'disabled' : ''}`} 
          data-id = {data.id}
          onClick = {gameOver || !start ? null : handleScoring} 
        >

          <div className = 'card-front'>
            <p className="pkmn-name">{capitalizeString(data.name)}</p>
            <img 
              src = {data.sprites.front_default}
              alt = {data.name}
              className = 'pkmn-image'
            />
          </div>
          
          <div className = 'card-back'>
            <BallIcons level={level}/>
          </div>
        
        </div>   
      )
    });

    const StartBtn = function () {
      return (
        <button onClick={handleStart} className='start-btn'>
           START
        </button>
      )
    }

    return (
      <div className = 'cards-cont'>
        {CardsArray}
        {!start && <StartBtn/>}
      </div>
    )
  }

  return (
      <ImageCards/>
  )
}

Cards.propTypes = {
  dataObjArr: PropTypes.array,
  start: PropTypes.bool,
  gameOver: PropTypes.bool,
  score: PropTypes.number,
  level: PropTypes.number,
  handleStart: PropTypes.func,
  handleScoring: PropTypes.func,
}

export default Cards