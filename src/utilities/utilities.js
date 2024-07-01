// Random number generator
const generateRandomNumber = function (min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const capitalizeString = function (string) {
  const spacerRegex = /[^-]+|-/g;
  const stringArray = string.match(spacerRegex);
  const newStringArray = stringArray.map((string) => {
    return(
      `${string.slice(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`
    )
  });

  return newStringArray.join(' ');
}

const animateFlip = async function (face) {
  const cards = document.querySelectorAll('div.card');

  if (face) {
    cards.forEach(card => {
      card.classList.remove('flip-back');
      card.classList.add('flip-front');
    })

  } else {
    cards.forEach(card => {
      card.classList.remove('flip-front');
      card.classList.add('flip-back');
    })

  }

  return face
}

const showLoadingScreen = function (status) {
  const loadingModal = document.querySelector('dialog.loading-screen');

  if (status) {
    loadingModal.showModal();
  } else {
    loadingModal.close();
  }

}

export {generateRandomNumber, capitalizeString, animateFlip, showLoadingScreen}