import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { capitalizeString } from "../utilities/utilities";

const Cards = function ({dataObjArr, handleScoring, cardBackData}) {

  const ImageCards = function () {

    // Animate card flip
    useEffect(() => {
      // When the component mount, card will flip to the front
      const cards = document.querySelectorAll('div.card');
      cards.forEach(card => {
        card.classList.add('flip-front');
      })

      // When the component unmount, card will flip to the back
      return () => {
        cards.forEach(card => {
          card.classList.add('flip-back');
        })
      }
    })

    const CardsArray = dataObjArr.map(data => {
      
      return (
        <div 
          key = {data.id} 
          className = 'card' 
          onClick = {handleScoring} 
          data-id = {data.id}
        >

          <div className = 'card-front'>
            <img 
            src = {data.sprites.front_default}
            alt = {data.name}
            className = 'pkmn-image'
            />
            <p className="pkmn-name">{capitalizeString(data.name)}</p>
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
      <div className='cards-cont'>
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
  })
}

export default Cards