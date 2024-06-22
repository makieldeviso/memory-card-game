import { useState, useEffect } from "react"
import getBatchData from "../utilities/getAPIData";
import { generateRandomNumber } from "../utilities/utilities";


const Cards = function () {
  const [level, setLevel] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    
    const getImages = async function () {
      const imgBatch = await getBatchData(6);
      setImages((i) => i = imgBatch);   
    }
  
    getImages();

    // Clean up code
    return () => {
      setImages([]);
    }

  },[level]);


  const handleShuffleCards = function () {

    const shuffleCards = function (current = [...images], shuffled = []) {

      if (current.length > 0) {
        const randomIndex = generateRandomNumber(0, current.length - 1);
        const getImage = current.splice(randomIndex, 1);
        return shuffleCards([...current], [...shuffled, getImage[0]]);

      } else {
        return shuffled
      }
    }

    setImages(shuffleCards());
  }

  const ImageCards = function () {
    
    const CardsArray = images.map(imgSrc => {
      
      const keyId = crypto.randomUUID();
      return (
        <img 
          src = {imgSrc}
          alt = {images.indexOf(imgSrc)}
          key = {keyId}
          className = 'card'
          width = '200'
          height= '200'
          onClick = {handleShuffleCards}
        />  
      )
    });
    
    return (
      <div className='cards-cont'>
        {CardsArray}
      </div>
    )
  }

  return (
    <div>
      <ImageCards/>
    </div>
  )
}

export default Cards