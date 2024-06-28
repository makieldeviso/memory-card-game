import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { animateFlip, capitalizeString } from "../utilities/utilities";

const Cards = function ({dataObjArr, handleScoring, cardBackData, gameOver}) {
  useEffect(() => {
   
    animateFlip(true);
    
    return () => {
      animateFlip(false);
    }
  })

  const ImageCards = function () {
    const CardsArray = dataObjArr.map(data => {
      return (
        <div 
          key = {data.id} 
          className = {`card ${gameOver ? 'disabled' : ''}`} 
          data-id = {data.id}
          onClick = {gameOver ? null : handleScoring} 
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
            <img 
              src = {cardBackData.sprites.default}
              alt = {cardBackData.name} 
              className="level-icon"
            />
          </div>
        
        </div>   
      )
    });
    
    return (
      <div className = 'cards-cont'>
        {CardsArray}
      </div>
    )
  }

  return (
      <ImageCards/>
  )
}

Cards.propTypes = {
  dataObjArr: PropTypes.array,
  handleScoring: PropTypes.func,
  cardBackData: PropTypes.shape ({
    sprites: PropTypes.shape({
      default: PropTypes.string
    }),
    name: PropTypes.string
  }),
  gameOver: PropTypes.bool
}

export default Cards