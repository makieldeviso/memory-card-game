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

export {generateRandomNumber, capitalizeString}