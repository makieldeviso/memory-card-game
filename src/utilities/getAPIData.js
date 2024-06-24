import { generateRandomNumber } from "./utilities";
const baseUrl =  'https://pokeapi.co/api/v2';

const createRandomPokemonUrl = function () {
  const randomNumber = generateRandomNumber(1, 500);
  const pokemonUrl = `${baseUrl}/pokemon/${randomNumber}/`;
  return pokemonUrl;
}

const createItemUrl = function (itemName) {
  const itemUrl = `${baseUrl}/item/${itemName}/`;
  return itemUrl;
}

const getData = async function (url) {
  
  try {
    const requestUrl = url;
    const response = await fetch(requestUrl, {
      method: 'GET',
      mode: 'cors'
    })

    const JSONData = await response.json();
    return JSONData;

  } catch (error) {
    console.log('here')
    return {error: 'Not found'}
  }

}


const getBatchData = async function (count, arr = []) {
  // Note: count parameter -> number of images to get
  let objArr = [...arr];

  let dataObj = await getData(createRandomPokemonUrl());
  
  // Check if an object is already in the array
  // Reroll fetch if obj is already inside
  const checkResult = objArr.filter((obj) => obj.id === dataObj.id).length > 0;
  while (checkResult) {
    dataObj = await getData(createRandomPokemonUrl());
  }

  if (objArr.length < count) {
    console.log('loading');
    return await getBatchData(count, [...objArr, dataObj]);

  } else {
    return objArr
  }

}

const getItemData = function (itemName) {
  const itemUrl = createItemUrl(itemName)
  const itemObj = getData(itemUrl);
  return itemObj;
}



export {getBatchData, getItemData}