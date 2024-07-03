const storageItemName = 'memoryCardByMakieldeviso';

const saveHighestScore = function (score) {
  const scoreObj = JSON.stringify({previousHigh: score});

  localStorage.setItem(storageItemName, scoreObj);
}

const getHighestScore = async function () {
  let highScore = localStorage.getItem(storageItemName);
  
  if (!highScore) {
    saveHighestScore(0);
    highScore = localStorage.getItem(storageItemName);
  } 

  const parsedScore = await JSON.parse(highScore);
  return parsedScore
}

const checkHighestScore = async function (score) {
  const highScore = await getHighestScore();

  let result = false;
  if (score > highScore.previousHigh) {
    result = true;
  }

  return result
}


export { checkHighestScore, getHighestScore, saveHighestScore }