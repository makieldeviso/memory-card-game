const storageItemName = 'memoryCardByMakieldeviso';

const saveHighestScore = function (level, score) {
  const scoreObj = JSON.stringify({level, score});
  localStorage.setItem(storageItemName, scoreObj);
}

const getHighestScore = async function () {
  let highScore = localStorage.getItem(storageItemName);
  
  if (!highScore) {
    saveHighestScore(1, 0);
    highScore = localStorage.getItem(storageItemName);
  } 

  const parsedScore = await JSON.parse(highScore);
  return parsedScore
}

const checkHighestScore = async function (level, score) {
  const highScore = await getHighestScore();

  if (score > highScore.score) {
    saveHighestScore(level, score)
  }
  // Return true = update complete
  return true;
}


export { checkHighestScore, getHighestScore }